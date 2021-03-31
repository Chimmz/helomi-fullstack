import React from 'react';
import './Chat-header.scss';
import './Icon.scss';

function ChatHeader() {
   return (
      <div className="chatting-section__header">
         <div className="chatting-section__header__userdetails">
            <img
               src="https://media.images.yourquote.in/post/large/0/0/13/395/4Vo98140.jpg"
               alt=""
               className="chatting-section__header__userphoto pic pic--sm"
            />
            <span className="chatting-section__header__username">
               Rachel Richard
            </span>
         </div>
         <div className="chatting-section__header__nav">
            <div className="icon icon--md">
               <i className="fas fa-phone-alt"></i>
            </div>
            <div className="icon icon--md">
               <i className="fas fa-video"></i>
            </div>
            <div className="icon icon--md">
               <i className="fas fa-caret-down"></i>
            </div>
         </div>
      </div>
   );
}
export default ChatHeader;
