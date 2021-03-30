import React from 'react';
import Chat from './Chat';
import './ChatList.scss';

function ChatList() {
   return (
      <ul class="allchats__chatlist remove-bullets">
         <Chat />
      </ul>
   );
}
export default ChatList;
