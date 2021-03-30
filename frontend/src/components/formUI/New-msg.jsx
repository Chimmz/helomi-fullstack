import React from 'react';
import '../../sass/textfield.scss';
import './New-msg.scss';
import '../Icon.scss';

function NewMsgForm() {
   return (
      <form action="" class="new-msg">
         <div class="new-msg__group">
            <input
               type="text"
               class="textfield textfield--message new-msg__input"
               placeholder="Type a message"
            />
            <div class="icon">&times;</div>
         </div>
         <div class="icon">
            <i class="fas fa-paper-plane"></i>
         </div>
      </form>
   );
}
export default NewMsgForm;
