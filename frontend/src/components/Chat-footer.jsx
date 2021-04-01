import React, { useState } from 'react';

import './Chat-footer.scss';
import TextInput from './formUI/TextInput';
import './Icon.scss';

function ChatFooter() {
   const [newMsg, setNewMsg] = useState('');

   const onChange = ev => setNewMsg(ev.target.value);

   const sendMsg = ev => {
      ev && ev.preventDefault();
      alert(newMsg);
   };

   return (
      <div className="chatting-section__footer">
         <div className="icon">
            <i className="fas fa-file-invoice"></i>
         </div>
         <div className="icon">
            <i className="far fa-laugh"></i>
         </div>

         <form className="new-msg" onSubmit={sendMsg}>
            <div className="new-msg__group">
               <TextInput
                  type="text"
                  className="textfield textfield--message new-msg__input"
                  placeholder="Type a message"
                  value={newMsg}
                  onChange={onChange}
               />
               <div className="icon" onClick={() => setNewMsg('')}>
                  &times;
               </div>
            </div>
            <div className="icon" onClick={() => sendMsg()} type="submit">
               <i className="fas fa-paper-plane"></i>
            </div>
         </form>
      </div>
   );
}

export default ChatFooter;
