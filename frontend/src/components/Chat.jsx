import React from 'react';
import './Chat.scss';

function Chat() {
   return (
      <>
         <li class="chat chat--has-unread-messages">
            <img
               src="img/realtor-3.jpeg"
               alt=""
               class="chat__photo pic pic--sm"
            />
            <div class="chat__info">
               <span class="chat__name">Joe Wilson</span>
               <span class="chat__lastmessage">Hey, where did you go?</span>
            </div>
            <span class="chat__time">2:35 PM</span>
            <span class="unread-messages-count">3</span>
         </li>
         <li class="chat chat--active">
            <img src="img/face3.jpg" alt="" class="chat__photo pic pic--sm" />
            <div class="chat__info">
               <span class="chat__name">Rachel Richard</span>
               <span class="chat__lastmessage">Hi, how have you been??</span>
            </div>
            <span class="chat__time">2:35 PM</span>
         </li>
      </>
   );
}
export default Chat;
