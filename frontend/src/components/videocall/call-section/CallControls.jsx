import React from 'react';
import { connect } from 'react-redux';
import { endVideoCall } from '../../../redux/videocall/videocall.action.creators';
import './CallControls.scss';

function CallControls({ dispatch }) {
   return (
      <div class="videocall__call__controls">
         <span
            class="videocall__callcontrol with-label with-label-at-top videocall__callcontrol is-muted"
            data-label="Mute audio"
         >
            <i class="fas fa-microphone"></i>
         </span>
         <span
            class="videocall__callcontrol with-label with-label-at-top"
            data-label="Stop video"
         >
            <i class="fas fa-video"></i>
         </span>
         <span
            class="videocall__callcontrol with-label with-label-at-top"
            data-label="Mute speaker"
         >
            <i class="fas fa-volume-up"></i>
         </span>
         <span
            className="videocall__callcontrol with-label with-label-at-top"
            data-label="End call"
            onClick={() => dispatch(endVideoCall())}
         >
            <i class="fas fa-phone" data-label="End call"></i>
         </span>
      </div>
   );
}

export default connect()(CallControls);
