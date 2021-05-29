import React from 'react';
import { connect } from 'react-redux';
import { END_CALL } from '../../../redux/videocall/videocall.action.types';

import { useToggle } from '../../../hooks/useToggle';
import './CallControls.scss';

function CallControls({ dispatch }) {
   const [micOn, _, toggleMic] = useToggle(false);
   const [videoOn, __, toggleVideo] = useToggle(true);
   const [speakerOn, ___, toggleSpeaker] = useToggle(true);

   return (
      <div className="videocall__call__controls">
         <span
            className={`videocall__callcontrol with-label with-label-at-top videocall__callcontrol ${
               !micOn && 'is-muted'
            }`}
            data-label={micOn ? 'Mute audio' : 'Unmute audio'}
            onClick={toggleMic}
         >
            <i className="fas fa-microphone"></i>
         </span>
         <span
            className={`videocall__callcontrol with-label with-label-at-top ${
               !videoOn && 'is-muted'
            }`}
            data-label={videoOn ? 'Stop video' : 'Start video'}
            onClick={toggleVideo}
         >
            <i className="fas fa-video"></i>
         </span>
         <span
            className={`videocall__callcontrol with-label with-label-at-top ${
               !speakerOn && 'is-muted'
            }`}
            data-label={speakerOn ? 'Mute speaker' : 'Unmute speaker'}
            onClick={toggleSpeaker}
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
