import React from 'react';
import './CallControls.scss';

function CallControls() {
   return (
      <div class="videocall__call__controls">
         <span
            class="videocall__callcontrol with-popup-label videocall__callcontrol is-muted"
            data-label="Mute audio"
         >
            <i class="fas fa-microphone"></i>
         </span>
         <span
            class="videocall__callcontrol with-popup-label"
            data-label="Stop video"
         >
            <i class="fas fa-video"></i>
         </span>
         <span
            class="videocall__callcontrol with-popup-label"
            data-label="Mute speaker"
         >
            <i class="fas fa-volume-up"></i>
         </span>
      </div>
   );
}

export default CallControls;
