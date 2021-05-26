import React, { useState, useEffect, useContext, useRef } from 'react';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../../redux/user/user.selectors';
import { selectVideoChatRoomId } from '../../../redux/videocall/videocall.selectors';

import { useToggle } from '../../../hooks/useToggle';
import { socketContext } from '../../../contexts/SocketProvider';
import AllParticpantsInCall from './AllParticpantsInCall';
import Peer from 'simple-peer';
import './PeerToPeerCall.scss';
import './ParticpantInCall.scss';

function PeerToPeerCall({ chatId, videocallRoomId, currentUser }) {
   const { socket } = useContext(socketContext);
   const localVideoRef = useRef();
   const remoteVideoRef = useRef();
   const [localStream, setLocalStream] = useState(null);

   const configureUserVideo = stream => {
      // if (!localVideoRef.current) return;
      // localVideoRef.current.srcObject = stream;
      // localVideoRef.current.muted = true;
      // localVideoRef.current.play();
   };

   const makeCall = async stream => {
      const iceConfig = {
         iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
      };
      const peerConn = new RTCPeerConnection(iceConfig);
      stream.getTracks().forEach(track => peerConn.addTrack(track));
      // socket.on('')
      const offer = await peerConn.createOffer();
      await peerConn.setLocalDescription(offer);

      socket.emit('outgoing-videocall', {
         caller: currentUser._id,
         to: chatId,
         roomId: videocallRoomId,
         offer
      });
   };

   const handleGotStream = stream => {
      console.log('stream', stream);
      setLocalStream(stream);
      if (!localVideoRef.current) return;
      localVideoRef.current.srcObject = stream;
      makeCall(stream);
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
            {localStream && (
               <video
                  src=""
                  className="videocall__participant__video"
                  ref={remoteVideoRef}
                  autoPlay
                  muted
               ></video>
            )}
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
   videocallRoomId: selectVideoChatRoomId
});
export default connect(mapStateToProps)(PeerToPeerCall);
