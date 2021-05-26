import React from 'react';
import { connect } from 'react-redux';
import { END_CALL } from '../../../redux/videocall/videocall.action.types';
import './CallControls.scss';

function CallControls({ dispatch }) {
   return (
      <div className="videocall__call__controls">
         <span
            className="videocall__callcontrol with-label with-label-at-top videocall__callcontrol is-muted"
            data-label="Mute audio"
         >
            <i className="fas fa-microphone"></i>
         </span>
         <span
            className="videocall__callcontrol with-label with-label-at-top"
            data-label="Stop video"
         >
            <i className="fas fa-video"></i>
         </span>
         <span
            className="videocall__callcontrol with-label with-label-at-top"
            data-label="Mute speaker"
         >
            <i className="fas fa-volume-up"></i>
         </span>
         <span
            className="videocall__callcontrol with-label with-label-at-top"
            data-label="End call"
            onClick={() => dispatch({ type: END_CALL })}
         >
            <i className="fas fa-phone" data-label="End call"></i>
         </span>
      </div>
   );
}

export default connect()(CallControls);
