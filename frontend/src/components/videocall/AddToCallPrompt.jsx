import React from 'react';

import ChatListInPrompt from './ChatListInPrompt';
import './AddToCallPrompt.scss';

function AddToCallPrompt() {
   return (
      <div class="modal add-attendee-modal">
         <h1 class="add-attendee-modal__header">Add someone</h1>
         <ChatListInPrompt />
         <div class="add-attendee-modal__footer">
            <button class="btn btn-text-white">Close</button>
            <button class="btn btn-white">Add</button>
         </div>
         <span class="add-attendee-modal__close">&times;</span>
      </div>
   );
}

export default AddToCallPrompt;
