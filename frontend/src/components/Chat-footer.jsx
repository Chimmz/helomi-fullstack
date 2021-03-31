import React from 'react';
import NewMsgForm from './formUI/New-msg';
import './Chat-footer.scss';
import './Icon.scss';

function ChatFooter() {
   return (
      <div className="chatting-section__footer">
         <div className="icon">
            <i className="fas fa-file-invoice"></i>
         </div>
         <div className="icon">
            <i className="far fa-laugh"></i>
         </div>
         <NewMsgForm />
      </div>
   );
}

export default ChatFooter;
