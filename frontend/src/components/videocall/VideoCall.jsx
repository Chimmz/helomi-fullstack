import React from 'react';
import AddToCallPrompt from './AddToCallPrompt';

import ChatsAndAttendees from './chats-and-attendees/ChatsAndAttendees';
import CallSection from './call-section/Call-section';
import './VideoCall.scss';

function VideoCall() {
   return (
      <div class="videocall-modal">
         <ChatsAndAttendees />
         <CallSection />
         {/* <AddToCallPrompt /> */}
      </div>
   );
}

export default VideoCall;
