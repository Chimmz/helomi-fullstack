import React, { useState, useEffect, useContext, useRef } from 'react';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../../redux/user/user.selectors';
import {
   selectCaller,
   selectCallingWho,
   selectRtcOffer,
   selectVideoChatRoomId
} from '../../../redux/videocall/videocall.selectors';
import { SET_RTC_ANSWER } from '../../../redux/videocall/videocall.action.types';

import { useToggle } from '../../../hooks/useToggle';
import { socketContext } from '../../../contexts/SocketProvider';
import AllParticpantsInCall from './AllParticpantsInCall';
import './PeerToPeerCall.scss';
import './ParticpantInCall.scss';

function PeerToPeerCall(props) {
   // prettier-ignore
   const { caller, callingWho, videocallRoomId, rtcOffer, currentUser, dispatch } = props;
   console.log('caller, callingWho', caller, callingWho);
   const { socket } = useContext(socketContext);
   const localVideoRef = useRef();
   const remoteVideoRef = useRef();
   // const [localStream, setLocalStream] = useState(null);

   const configureUserVideo = stream => {
      if (localVideoRef.current) {
         localVideoRef.current.srcObject = stream;
         localVideoRef.current.muted = true;
         localVideoRef.current.play();
      }
   };

   const configureRemoteVideo = stream => {
      try {
         if (remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = stream;
            remoteVideoRef.current.muted = true;
            remoteVideoRef.current.play();
         }
      } catch (err) {
         console.log('Err in configging remote video');
      }
   };

   // const getConnection = () => {
   //    const iceConfig = {
   //       iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
   //    };
   //    const peerConn = new RTCPeerConnection(iceConfig);
   // }

   const initConnection = async stream => {
      const iceConfig = {
         iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
      };
      const peerConn = new RTCPeerConnection(iceConfig);
      stream.getTracks().forEach(track => peerConn.addTrack(track, stream));

      socket.on('call-answered', async answer => {
         await peerConn.setRemoteDescription(new RTCSessionDescription(answer));
         dispatch({ type: SET_RTC_ANSWER, payload: { answer } });
      });
      console.log('At stage new', peerConn);

      peerConn.addEventListener('icecandidate', ev => {
         if (!ev.candidate) return;
         socket.emit('candidate-out', {
            to: callingWho,
            candidate: ev.candidate
         });
      });

      socket.on('candidate-in', iceCandidate => {
         if (!iceCandidate) return;
         // alert('Candidate sent: ', iceCandidate);
         peerConn
            .addIceCandidate(iceCandidate)
            .then(_ => console.log('Candidate added', peerConn))
            .catch(err => {
               alert('Sorry something wrong happened: ', err);
            });
      });

      peerConn.addEventListener('connectionstatechange', _ => {
         if (peerConn.connectionState === 'connected')
            console.log('CONNECTED!!');
      });

      peerConn.addEventListener('track', ev => {
         const remoteStream = new MediaStream();
         remoteStream.addTrack(ev.track, remoteStream);
         configureRemoteVideo(remoteStream);
      });

      const offer = await peerConn.createOffer();
      await peerConn.setLocalDescription(offer);

      socket.emit('outgoing-videocall', {
         caller: currentUser._id,
         to: callingWho,
         roomId: videocallRoomId,
         offer
      });
   };

   const joinConnection = async stream => {
      const iceConfig = {
         iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
      };
      const peerConn = new RTCPeerConnection(iceConfig);
      stream.getTracks().forEach(track => peerConn.addTrack(track, stream));
      await peerConn.setRemoteDescription(new RTCSessionDescription(rtcOffer));
      console.log('At stage new', peerConn);

      peerConn.addEventListener('icecandidate', ev => {
         if (!ev.candidate) return;
         socket.emit('candidate-out', { to: caller, candidate: ev.candidate });
      });

      socket.on('candidate-in', iceCandidate => {
         if (!iceCandidate) return;
         // alert('Candidate sent: ', iceCandidate);
         peerConn
            .addIceCandidate(iceCandidate)
            .then(_ => console.log('Candidate added: ', peerConn))
            .catch(err => {
               alert("Sorry couldn't add candidate: ", err);
            });
      });

      peerConn.addEventListener('connectionstatechange', _ => {
         if (peerConn.connectionState === 'connected')
            console.log('CONNECTED!!');
      });

      peerConn.addEventListener('track', ev => {
         const remoteStream = new MediaStream();
         remoteStream.addTrack(ev.track, remoteStream);
         configureRemoteVideo(remoteStream);
      });

      const answer = await peerConn.createAnswer();
      await peerConn.setLocalDescription(new RTCSessionDescription(answer));
      socket.emit('answer-call', { to: caller, answer });
   };

   const handleGotStream = stream => {
      configureUserVideo(stream);
      if (caller === currentUser._id) initConnection(stream);
      else joinConnection(stream);
   };

   useEffect(() => {
      // socket.emit('join-video-chat-room', )
      (function getUserMedia() {
         (
            window.navigator.mediaDevices ||
            window.navigator.webkitGetUserMedia ||
            window.navigator.mozGetUserMedia
         )
            .getUserMedia({ audio: true, video: true })
            .then(handleGotStream)
            .catch(err => alert(err));
      })();
   }, []);
   return (
      <AllParticpantsInCall>
         <div className="videocall__participant videocall__participant--peer">
            <video
               src=""
               className="videocall__participant__video"
               ref={remoteVideoRef}
               autoPlay
               muted
            ></video>
            <span className="videocall__participant__name">Mary Smith</span>
         </div>

         <div className="videocall__participant videocall__participant--user">
            <video
               src=""
               className="videocall__participant__video"
               ref={localVideoRef}
            ></video>
         </div>
      </AllParticpantsInCall>
   );
}
const mapStateToProps = createStructuredSelector({
   currentUser: selectCurrentUser,
   caller: selectCaller,
   callingWho: selectCallingWho,
   videocallRoomId: selectVideoChatRoomId,
   rtcOffer: selectRtcOffer
});
export default connect(mapStateToProps)(PeerToPeerCall);
