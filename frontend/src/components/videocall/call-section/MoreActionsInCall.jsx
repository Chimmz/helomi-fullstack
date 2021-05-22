import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
   exitFullscreen,
   zoomToFullscreen
} from '../../../redux/videocall/videocall.action.creators';
import { selectIsFullscreen } from '../../../redux/videocall/videocall.selectors';

import './MoreActionsInCall.scss';

function MoreActionsInCall({ isFullscreen, zoomToFullscreen, exitFullscreen }) {
   return (
      <div className="videocall__call__more-actions">
         <input type="checkbox" id="more-actions" />
         <label htmlFor="more-actions">
            <span>
               <i className="fas fa-ellipsis-v"></i>
            </span>
            <ul className="videocall__call__options remove-bullets">
               {isFullscreen ? (
                  <li
                     className="videocall__call__option"
                     onClick={exitFullscreen}
                  >
                     <i className="fas fa-compress-arrows-alt"></i>
                     <span>Exit full screen</span>
                  </li>
               ) : (
                  <li
                     className="videocall__call__option"
                     onClick={zoomToFullscreen}
                  >
                     <i className="fas fa-expand-arrows-alt screen-size"></i>
                     <span>Zoom to full screen</span>
                  </li>
               )}
            </ul>
         </label>
      </div>
   );
}
const mapDispatchToProps = dispatch => ({
   exitFullscreen: () => dispatch(exitFullscreen()),
   zoomToFullscreen: () => dispatch(zoomToFullscreen())
});
const mapStateToProps = createStructuredSelector({
   isFullscreen: selectIsFullscreen
});
export default connect(mapStateToProps, mapDispatchToProps)(MoreActionsInCall);
