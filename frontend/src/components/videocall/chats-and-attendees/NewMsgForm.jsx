import React from 'react';

import '../../Icon.scss';
import './NewMsgForm.scss';

function NewMsgForm() {
   return (
      <form className="newmsg">
         <input
            type="text"
            className="input"
            placeholder="Type a new message here"
         />
         <span className="send icon icon--sm icon--bg-blue">
            <i className="fas fa-paper-plane"></i>
         </span>
      </form>
   );
}

export default NewMsgForm;
