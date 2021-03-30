import React from 'react';
import './Chat-header.scss';

function ChatHeader() {
   return (
      <div class="chatting-section__header">
         <div class="chatting-section__header__userdetails">
            <img
               src="img/face3.jpg"
               alt=""
               class="chatting-section__header__userphoto pic pic--sm"
            />
            <span class="chatting-section__header__username">
               Rachel Richard
            </span>
         </div>
         <div class="chatting-section__header__nav">
            <div class="icon icon--md">
               <i class="fas fa-phone-alt"></i>
            </div>
            <div class="icon icon--md">
               <i class="fas fa-video"></i>
            </div>
            <div class="icon icon--md">
               <i class="fas fa-caret-down"></i>
            </div>
         </div>
      </div>
   );
}
export default ChatHeader;
