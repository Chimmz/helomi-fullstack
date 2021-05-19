import React from 'react';

import VideocallMsg from './VideocallMsg';
import NewMsgForm from './NewMsgForm';
import './Msg-section.scss';

function MsgSection() {
   return (
      <div class="videocall__chats">
         <VideocallMsg />
         <NewMsgForm />
      </div>
   );
}

export default MsgSection;
