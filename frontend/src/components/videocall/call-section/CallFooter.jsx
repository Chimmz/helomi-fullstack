import React from 'react';

import './CallFooter.scss';
import CallOptions from './CallOptions';
import CallControls from './CallControls';
import MoreActionsInCall from './MoreActionsInCall';

function CallFooter() {
   return (
      <div class="videocall__call__footer">
         <CallOptions />
         <CallControls />
         <MoreActionsInCall />
      </div>
   );
}

export default CallFooter;
