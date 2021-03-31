import React from 'react';
import ChatFooter from '../Chat-footer';
import ChatHeader from '../Chat-header';
import MessagesBox from '../Messages-box';
import './Chatting-section.scss';

function ChattingSection() {
   return (
      <div className="chatting-section">
         <ChatHeader />
         <MessagesBox />
         <ChatFooter />
      </div>
   );
}
export default ChattingSection;
