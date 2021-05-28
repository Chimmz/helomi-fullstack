import React, { useState, useEffect, useContext, useRef } from 'react';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../../redux/user/user.selectors';
import {
   selectCaller,
   selectCallingWho,
   selectRtcCandidate,
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
   const { caller, callingWho, videocallRoomId, currentUser, dispatch } = props;
   console.log('caller, callingWho', caller, callingWho);
   const { socket } = useContext(socketContext);
   const localVideoRef = useRef();
   const remoteVideoRef = useRef();
   const [localStream, setLocalStream] = useState(null);
   const [remoteStream, setRemoteStream] = useState(new MediaStream());

   const getUserMediaStream = function getUserMedia() {
      const getUserMedia = (
         navigator.getUserMedia ||
         navigator.webkitGetUserMedia ||
         navigator.mozGetUserMedia
      ).bind(window.navigator);

      return new Promise(function (resolve, reject) {
         getUserMedia(
            { audio: true, video: true },
            stream => {
               console.log('STREAM', stream);
               setLocalStream(stream);
               resolve(stream);
            },
            err => reject(err)
         );
      });
   };

   class PeerConnection {
      _iceConfig = {
         iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
      };
      constructor({ isInitiator, stream }) {
         this.connection = new RTCPeerConnection(this._iceConfig);
         this.isInitiator = isInitiator || false;
         this.stream = stream;
         this.isConnected = false;

         this.init();
      }

      init() {
         this.connection.onicecandidate = this.handleIceCandidate;
         this.connection.ontrack = this.handleTrackEvent;
         this.connection.onnegotiationneeded = this.handleNegotiationNeeded;
         this.connection.onremovetrack = this.handleRemoveTrack;
         this.connection.oniceconnectionstatechange =
            this.handleIceConnectionStateChange;
         this.connection.onconnectionstatechange =
            this.handleConnectionStateChange;
         this.connection.onicegatheringstatechange =
            this.handleIceGatheringStateChange;
         this.connection.onsignalingstatechange =
            this.handleSignalingStateChange;
      }

      handleNegotiationNeeded = async _ => {
         try {
            const offer = await this.connection.createOffer();
            await this.connection.setLocalDescription(offer);
            console.log('In handleNegotiationNeeded');
            console.log(this.connection);

            socket.emit('outgoing-videocall', {
               caller: currentUser._id,
               to: callingWho,
               roomId: videocallRoomId,
               offer
            });
         } catch (err) {
            console.log('Err in handleNegotiationNeeded');
         }
      };

      handleIceCandidate = ev => {
         if (!ev.candidate) return;
         console.log('handleIceCandidate from server');
         console.log(this.connection);

         socket.emit('candidate-out', {
            to: this.isInitiator ? callingWho : caller,
            candidate: ev.candidate
         });
      };

      handleIncomingCandidate = candidate => {
         if (!candidate) return;
         this.connection
            .addIceCandidate(new RTCIceCandidate(candidate))
            .catch(err => console.log(err));
         console.log('Receiving incoming candidate');
         console.log(this.connection);
      };

      handleIceConnectionStateChange = _ => {
         switch (this.connection.iceConnectionState) {
            case 'connected':
               console.log('CONNECTED!');
               break;
            case 'closed':
            case 'failed':
               this.closeVideoCall();
               break;
         }
      };

      handleConnectionStateChange = _ => {
         if (this.connection.connectionState === 'connected')
            console.log('CONNECTED!!');
      };

      handleTrackEvent = ev => {
         const [stream] = ev.streams;
         setRemoteStream(stream);
         remoteVideoRef.current.srcObject = stream;
         console.log('Incoming track from remote peer');
      };
      // handleCallAnswered = async answer => {
      //    await this.connection.setRemoteDescription(
      //       new RTCSessionDescription(answer)
      //    );
      //    dispatch({ type: SET_RTC_ANSWER, payload: { answer } });
      // };

      handleRemoveTrack = ev => {};
      handleIceGatheringStateChange = ev => {};
      handleSignalingStateChange = ev => {};

      closeVideoCall = () => {
         if (this.connection) {
            this.connection.onicecandidate = null;
            this.connection.ontrack = null;
            this.connection.onnegotiationneeded = null;
            this.connection.onremovetrack = null;
            this.connection.oniceconnectionstatechange = null;
            this.connection.onicegatheringstatechange = null;
            this.connection.onsignalingstatechange = null;
         }
         remoteVideoRef.current?.srcObject
            .getTracks()
            .forEach(track => track.stop());

         localVideoRef.current?.srcObject
            .getTracks()
            .forEach(track => track.stop());

         this.connection.close();
         this.connection = null;

         socket.emit('call-ended-out', this.isInitiator ? callingWho : caller);
      };
   }

   const makeCall = async function () {
      const peerConn = new PeerConnection({ isInitiator: true });
      console.log('At stage new', peerConn);

      socket.on('candidate-in', peerConn.handleIncomingCandidate);

      const stream = await getUserMediaStream();
      stream
         .getTracks()
         .forEach(track => peerConn.connection.addTrack(track, stream));
      localVideoRef.current.srcObject = stream;

      socket.on('call-answered', async answer => {
         await peerConn.connection.setRemoteDescription(
            new RTCSessionDescription(answer)
         );
         dispatch({ type: SET_RTC_ANSWER, payload: { answer } });
      });
   };

   const joinCall = async function () {
      const peerConn = new PeerConnection({ isInitiator: false });
      console.log('At stage new', peerConn);

      const stream = await getUserMediaStream();
      stream
         .getTracks()
         .forEach(track => peerConn.connection.addTrack(track, stream));
      localVideoRef.current.srcObject = stream;

      const { rtcOffer } = props;
      await peerConn.connection.setRemoteDescription(
         new RTCSessionDescription(rtcOffer)
      );

      const answer = await peerConn.connection.createAnswer();
      await peerConn.connection.setLocalDescription(answer);
      socket.emit('answer-call', { to: caller, answer });

      const { rtcCandidate } = props;
      console.log('rtcCandidate from props', rtcCandidate);
      peerConn.handleIncomingCandidate(rtcCandidate);
   };

   useEffect(() => {
      if (caller === currentUser._id) makeCall();
      else joinCall();
      // socket.emit('join-video-chat-room', )
   }, []);
   return (
      <AllParticpantsInCall>
         <div className="videocall__participant videocall__participant--peer">
            {remoteStream && (
               <video
                  src=""
                  autoPlay
                  className="videocall__participant__video"
                  ref={remoteVideoRef}
               ></video>
            )}
            <span className="videocall__participant__name">Mary Smith</span>
         </div>

         <div className="videocall__participant videocall__participant--user">
            {localStream && (
               <video
                  src=""
                  autoPlay
                  muted
                  className="videocall__participant__video"
                  ref={localVideoRef}
               ></video>
            )}
         </div>
      </AllParticpantsInCall>
   );
}
const mapStateToProps = createStructuredSelector({
   currentUser: selectCurrentUser,
   caller: selectCaller,
   callingWho: selectCallingWho,
   videocallRoomId: selectVideoChatRoomId,
   rtcOffer: selectRtcOffer,
   rtcCandidate: selectRtcCandidate
});
export default connect(mapStateToProps)(PeerToPeerCall);
