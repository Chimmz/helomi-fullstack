import React from 'react';
import AddToCallPrompt from './AddToCallPrompt';
import ChatsAndAttendees from './chats-and-attendees/ChatsAndAttendees';
import './VideoCall.scss';

function VideoCall() {
   return (
      <div class="videocall-modal">
         {/* <AddToCallPrompt /> */}
         <ChatsAndAttendees />
      </div>
   );
}

export default VideoCall;
