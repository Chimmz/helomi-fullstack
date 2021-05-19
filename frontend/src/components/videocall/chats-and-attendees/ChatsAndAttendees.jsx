import React from 'react';

import './ChatsAndAttendees.scss';
import ChatsAndAttendeesNav from './ChatsAndAttendeesNav';
import MsgSection from './Msg-section';
import Attendees from './Attendees';

function ChatsAndAttendees() {
   return (
      <div class="videocall__chats-and-attendees">
         <h1 class="heading">Group Chat</h1>
         {/* <MsgSection /> */}
         <Attendees />

         <ChatsAndAttendeesNav />
      </div>
   );
}

export default ChatsAndAttendees;
