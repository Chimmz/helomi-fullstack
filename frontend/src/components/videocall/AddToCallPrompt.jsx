import React from 'react';
import './AddToCallPrompt.scss';

function AddToCallPrompt() {
   return (
      <div class="modal add-attendee-modal">
         <span class="add-attendee-modal__close">&times;</span>
         <h1 class="add-attendee-modal__header">Add someone</h1>
         <ul class="user-chatlist remove-bullets">
            <li class="each-row">
               <input type="checkbox" id="add-chat" />
               <label for="add-chat">
                  <div class="chat">
                     <img
                        src="img/face3.jpg"
                        alt=""
                        class="chat__photo pic pic--sm"
                     />
                     <span class="chat__name">Mary Branson</span>
                  </div>
               </label>
            </li>
         </ul>
         <div class="add-attendee-modal__footer">
            <button class="btn btn-text-white">Close</button>
            <button class="btn btn-white">Add</button>
         </div>
      </div>
   );
}

export default AddToCallPrompt;
