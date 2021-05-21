import React from 'react';
import './MoreActionsInCall.scss';

function MoreActionsInCall() {
   return (
      <div class="videocall__call__more-actions">
         <input type="checkbox" id="more-actions" />
         <label for="more-actions">
            <span>
               <i class="fas fa-ellipsis-v"></i>
            </span>
            <ul class="videocall__call__options remove-bullets">
               <li class="videocall__call__option">
                  <i class="fas fa-expand-arrows-alt screen-size"></i>
                  <span>Zoom to full screen</span>
               </li>
               <li class="videocall__call__option">
                  <i class="fas fa-compress-arrows-alt"></i>
                  <span>Exit full screen</span>
               </li>
            </ul>
         </label>
      </div>
   );
}

export default MoreActionsInCall;
