import React from 'react';
import './Messages-box.scss';
import Textmsg from './Textmsg';

function MessagesBox() {
   return (
      <div className="chatting-section__messages-box">
         <Textmsg />
      </div>
   );
}
export default MessagesBox;
