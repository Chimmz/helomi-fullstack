import React from 'react';

import PeerToPeerCall from './PeerToPeerCall';
import ConferenceCall from './Conference-call';
import CallFooter from './CallFooter';
import './Call-section.scss';

function CallSection() {
   return (
      <div class="videocall__call videocall__call--peer-to-peer">
         {/* <PeerToPeerCall /> */}
         <ConferenceCall />
         <CallFooter />
      </div>
   );
}

export default CallSection;
