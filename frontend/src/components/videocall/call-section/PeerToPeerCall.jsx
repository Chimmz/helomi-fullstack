import React, { useState, useEffect, useContext, useRef } from 'react';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../../redux/user/user.selectors';
import {
   selectCallEnded,
   selectCaller,
   selectCallingWho,
   selectRtcCandidate,
   selectRtcOffer,
   selectVideoChatRoomId
} from '../../../redux/videocall/videocall.selectors';
import {
   CALL_CONNECTED,
   CALL_DISCONNECTED,
   END_CALL,
   SET_RTC_ANSWER
} from '../../../redux/videocall/videocall.action.types';

import { selectCallConnected } from '../../../redux/videocall/videocall.selectors';

import { socketContext } from '../../../contexts/SocketProvider';
import { v4 as uuidv4 } from 'uuid';
import AllParticpantsInCall from './AllParticpantsInCall';
import './PeerToPeerCall.scss';
import './ParticpantInCall.scss';

function PeerToPeerCall(props) {
   // prettier-ignore
   const { caller, callingWho, videoChatRoomId, currentUser, dispatch } = props;
   console.log('caller, callingWho', caller, callingWho);
   const { socket } = useContext(socketContext);
   const localVideoRef = useRef();
   const remoteVideoRef = useRef();
   const [localStream, setLocalStream] = useState(null);
   const [remoteStream, setRemoteStream] = useState(new MediaStream());

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
         this.connectStreamToVideo();
         this.addOwnTracks();

         this.connection.onnegotiationneeded = this.handleNegotiationNeeded;
         this.connection.onicecandidate = this.handleIceCandidate;
         this.connection.ontrack = this.handleTrackEvent;
         this.connection.onremovetrack = this.handleRemoveTrack;
         this.connection.oniceconnectionstatechange = this.handleIceConnectionStateChange;
         this.connection.onconnectionstatechange = this.handleConnectionStateChange;
         this.connection.onicegatheringstatechange = this.handleIceGatheringStateChange;
         this.connection.onsignalingstatechange = this.handleSignalingStateChange;
      }

      connectStreamToVideo = () => {
         localVideoRef.current.srcObject = this.stream;
      };

      addOwnTracks = () => {
         this.stream
            .getTracks()
            .forEach(track => this.connection.addTrack(track, this.stream));
      };

      handleNegotiationNeeded = async _ => {
         try {
            const offer = await this.connection.createOffer();
            await this.connection.setLocalDescription(offer);
            console.log('In handleNegotiationNeeded');
            console.log(this.connection);

            socket.emit('outgoing-videocall', {
               caller: currentUser._id,
               to: callingWho,
               roomId: videoChatRoomId,
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

            case 'disconnected':
               dispatch({ type: CALL_DISCONNECTED });
               break;

            case 'closed':
            case 'failed':
               this.closeVideoCall();
               break;
         }
      };

      handleConnectionStateChange = _ => {
         switch (this.connection.connectionState) {
            case 'connected':
               console.log('CONNECTED!!');
               dispatch({ type: CALL_CONNECTED });
               break;

            case 'disconnected':
               dispatch({ type: CALL_DISCONNECTED });
               break;

            case 'closed':
               alert('Connection closed');
         }
      };

      handleTrackEvent = ev => {
         const [stream] = ev.streams;
         setRemoteStream(stream);
         remoteVideoRef.current.srcObject = stream;
         console.log('Incoming track from remote peer');
      };

      handleRemoveTrack = ev => {};
      handleIceGatheringStateChange = ev => {};
      handleSignalingStateChange = ev => {};

      handleCloseVideoCall = () => {
         // if (this.connection) {
         //    this.connection.onicecandidate = null;
         //    this.connection.ontrack = null;
         //    this.connection.onnegotiationneeded = null;
         //    this.connection.onremovetrack = null;
         //    this.connection.oniceconnectionstatechange = null;
         //    this.connection.onicegatheringstatechange = null;
         //    this.connection.onsignalingstatechange = null;
         // }
         // console.log(
         //    'localVideoRef',
         //    localVideoRef.current.srcObject,
         //    'remoteVideoRef',
         //    remoteVideoRef.current.srcObject
         // );
         // localVideoRef.current?.srcObject
         //    .getTracks()
         //    .forEach(track => track.stop());

         // localVideoRef.current.srcObject = null;

         // if (localVideoRef.current?.srcObject)
         //    localVideoRef.current?.srcObject
         //       .getTracks()
         //       .forEach(track => track.stop());

         // this.connection.close();
         // this.connection = null;

         dispatch({ type: END_CALL });
      };
   }

   class PeerInitiator extends PeerConnection {
      constructor(params) {
         super(params);
      }

      handleCallAnswered = async answer => {
         await this.connection.setRemoteDescription(
            new RTCSessionDescription(answer)
         );
         dispatch({ type: SET_RTC_ANSWER, payload: { answer } });
      };
   }

   class JoiningPeer extends PeerConnection {
      constructor(params) {
         super(params);
      }

      handleIncomingRtcOffer = async offer => {
         await this.connection.setRemoteDescription(
            new RTCSessionDescription(offer)
         );
      };

      createRtcAnswer = async () => {
         const answer = await this.connection.createAnswer();
         await this.connection.setLocalDescription(answer);
         socket.emit('answer-call', { to: caller, answer });
      };
   }

   const getUserMediaStream = function getUserMedia() {
      const getUserMedia = (
         navigator.getUserMedia ||
         navigator.webkitGetUserMedia ||
         navigator.mozGetUserMedia ||
         navigator.msGetUserMedia
      ).bind(window.navigator);

      return new Promise(function (resolve, reject) {
         getUserMedia(
            { audio: true, video: true },
            stream => {
               setLocalStream(stream);
               resolve(stream);
            },
            err => reject(err)
         );
      });
   };

   const makeCall = async function () {
      const stream = await getUserMediaStream();
      const peerConn = new PeerInitiator({ isInitiator: true, stream });
      console.log('At stage new', peerConn);

      socket.on('candidate-in', peerConn.handleIncomingCandidate);
      socket.on('call-answered', peerConn.handleCallAnswered);
      socket.on('click-end-call-btn', peerConn.handleCloseVideoCall);
      socket.on('user-left-call', peerConn.handleCloseVideoCall);
   };

   const joinCall = async function () {
      const stream = await getUserMediaStream();
      const peerConn = new JoiningPeer({ isInitiator: false, stream });
      console.log('At stage new', peerConn);

      socket.on('candidate-in', peerConn.handleIncomingCandidate);
      socket.on('click-end-call-btn', peerConn.handleCloseVideoCall);
      socket.on('user-left-call', peerConn.handleCloseVideoCall);

      peerConn.handleIncomingRtcOffer(props.rtcOffer);
      peerConn.createRtcAnswer();
   };

   useEffect(() => {
      console.log('videoChatRoomId', videoChatRoomId);
      socket.emit('join-video-chat-room', videoChatRoomId);
      caller === currentUser._id ? makeCall() : joinCall();
   }, []);
   return (
      <AllParticpantsInCall>
         {!props.callConnected && (
            <div className='videocall__call__is-ringing u-text-center u-full-width'>
               <i className='fas fa-phone-volume callnotify__icon'></i>{' '}
               Calling...
            </div>
         )}
         <div className='videocall__participant videocall__participant--peer'>
            {remoteStream && (
               <video
                  src=''
                  autoPlay
                  className='videocall__participant__video'
                  ref={remoteVideoRef}></video>
            )}
         </div>

         <div
            className={`videocall__participant videocall__participant--user ${
               props.callConnected
                  ? 'videocall__participant--user-send-to-bottom-right'
                  : 'videocall__participant--user-fullwidth'
            }`}>
            {localStream && (
               <video
                  src=''
                  autoPlay
                  muted
                  className='videocall__participant__video'
                  ref={localVideoRef}></video>
            )}
         </div>
      </AllParticpantsInCall>
   );
}
const mapStateToProps = createStructuredSelector({
   currentUser: selectCurrentUser,
   caller: selectCaller,
   callingWho: selectCallingWho,
   videoChatRoomId: selectVideoChatRoomId,
   rtcOffer: selectRtcOffer,
   rtcCandidate: selectRtcCandidate,
   callConnected: selectCallConnected,
   callEnded: selectCallEnded
});
export default connect(mapStateToProps)(PeerToPeerCall);
