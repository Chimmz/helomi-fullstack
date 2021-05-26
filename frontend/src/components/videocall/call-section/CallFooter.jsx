import React from 'react';

import './CallFooter.scss';
import CallOptions from './CallOptions';
import CallControls from './CallControls';
import MoreActionsInCall from './MoreActionsInCall';

function CallFooter() {
   return (
      <div className="videocall__call__footer">
         <CallOptions />
         <CallControls />
         <MoreActionsInCall />
      </div>
   );
}

export default CallFooter;
