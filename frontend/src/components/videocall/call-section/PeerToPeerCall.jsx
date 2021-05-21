import React from 'react';

import AllParticpantsInCall from './AllParticpantsInCall';
import './PeerToPeerCall.scss';
import './ParticpantInCall.scss';

function PeerToPeerCall() {
   return (
      <AllParticpantsInCall>
         <div class="videocall__participant videocall__participant--peer">
            <video src="" class="videocall__participant__video"></video>
            <span class="videocall__participant__name">Mary Smith</span>
         </div>

         <div class="videocall__participant videocall__participant--user">
            <video src="" class="videocall__participant__video"></video>
         </div>
      </AllParticpantsInCall>
   );
}

export default PeerToPeerCall;
