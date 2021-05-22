import React, { useState } from 'react';

import ChatsAndAttendeesNav from './ChatsAndAttendeesNav';
import MsgSection from './Msg-section';
import Attendees from './Attendees';
import './ChatsAndAttendees.scss';

function ChatsAndAttendees() {
   const [isViewingAttendees, setIsViewingAttendees] = useState(true);

   return (
      <div class="videocall__chats-and-attendees">
         <h1 class="heading">Group Chat</h1>
         {isViewingAttendees ? <Attendees /> : <MsgSection />}

         <ChatsAndAttendeesNav
            isViewingAttendees={isViewingAttendees}
            setIsViewingAttendees={setIsViewingAttendees}
         />
      </div>
   );
}

export default ChatsAndAttendees;
