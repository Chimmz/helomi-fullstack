import React from 'react';
import '../../sass/textfield.scss';
import './New-msg.scss';
import '../Icon.scss';

function NewMsgForm() {
   return (
      <form action="" className="new-msg">
         <div className="new-msg__group">
            <input
               type="text"
               className="textfield textfield--message new-msg__input"
               placeholder="Type a message"
            />
            <div className="icon">&times;</div>
         </div>
         <div className="icon">
            <i className="fas fa-paper-plane"></i>
         </div>
      </form>
   );
}
export default NewMsgForm;
