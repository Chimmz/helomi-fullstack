import React, { useEffect, useState, useRef } from 'react';

import AllParticpantsInCall from './AllParticpantsInCall';
import './PeerToPeerCall.scss';
import './ParticpantInCall.scss';

function PeerToPeerCall() {
   const [myStream, setMyStream] = useState({});
   const myStreamRef = useRef();

   const getUserMedia = async () => {
      window.navigator.mediaDevices
         .getUserMedia({ audio: true, video: true })
         .then(stream => {
            setMyStream({ stream });

            if (!myStreamRef.current) return;
            myStreamRef.current.srcObject = stream;
            myStreamRef.current.muted = true;
            myStreamRef.current.play();
         });
   };
   useEffect(() => {
      getUserMedia();
   }, []);
   return (
      <AllParticpantsInCall>
         <div class="videocall__participant videocall__participant--peer">
            <video src="" class="videocall__participant__video"></video>
            <span class="videocall__participant__name">Mary Smith</span>
         </div>

         <div
            class="videocall__participant videocall__participant--user"
            onCLick={() => alert()}
         >
            <video
               src=""
               class="videocall__participant__video"
               ref={myStreamRef}
            ></video>
         </div>
      </AllParticpantsInCall>
   );
}

export default PeerToPeerCall;
