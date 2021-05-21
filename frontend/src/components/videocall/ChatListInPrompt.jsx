import React from 'react';
import './ChatListInPrompt.scss';

function ChatListInPrompt() {
   return (
      <ul class="user-chatlist remove-bullets">
         <li class="each-row">
            <input type="checkbox" id="add-chat" />
            <label for="add-chat">
               <div class="chat">
                  <img
                     src="img/face3.jpg"
                     alt=""
                     class="chat__photo pic pic--sm"
                  />
                  <span class="chat__name">Mary Branson</span>
               </div>
            </label>
         </li>
      </ul>
   );
}

export default ChatListInPrompt;
