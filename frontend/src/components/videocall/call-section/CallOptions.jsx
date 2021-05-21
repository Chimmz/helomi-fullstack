import React from 'react';
import './CallOptions.scss';

function CallOptions() {
   return (
      <div class="videocall__call__options">
         <span
            class="videocall__call__option with-popup-label"
            data-label="Add new participant"
         >
            <i class="fas fa-user-plus"></i>
         </span>
      </div>
   );
}

export default CallOptions;
