import React from 'react';
import NewMsgForm from './formUI/New-msg';
import './Chat-footer.scss';
import './Icon.scss';

function ChatFooter() {
   return (
      <div class="chatting-section__footer">
         <div class="icon">
            <i class="fas fa-file-invoice"></i>
         </div>
         <div class="icon">
            <i class="far fa-laugh"></i>
         </div>
         <NewMsgForm />
      </div>
   );
}

export default ChatFooter;
