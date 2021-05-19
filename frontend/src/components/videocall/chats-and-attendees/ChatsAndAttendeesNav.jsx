import React from 'react';
import './ChatsAndAttendeesNav.scss';

function ChatsAndAttendeesNav() {
   return (
      <div class="videocall__chats-and-attendees-nav">
         <span class="chats" data-nav-item="chat-msgs">
            <i class="fas fa-comments"></i>
         </span>
         <div class="attendees nav-item--active" data-nav-item="attendees">
            <span class="total">15</span>
            <i class="fas fa-users"></i>
         </div>
      </div>
   );
}

export default ChatsAndAttendeesNav;
