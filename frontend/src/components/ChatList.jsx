import React from 'react';
import Chat from './Chat';
import './ChatList.scss';

function ChatList() {
   return (
      <div className="allchats__chatlist remove-bullets">
         <Chat />
      </div>
   );
}
export default ChatList;
