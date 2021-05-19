import React from 'react';
import './Attendees.scss';

function Attendees() {
   return (
      <ul class="videocall__attendees remove-bullets">
         <li class="videocall__attendee">
            <div class="videocall__attendee__details">
               <img
                  src="img/face2.jpg"
                  alt=""
                  class="videocall__attendee__pic pic pic--xsm"
               />
               <span class="videocall__attendee__name">Stella Brown</span>
            </div>
            <div class="host-actions">
               <button class="btn btn-md btn-primary">Unmute</button>
            </div>
            <div class="videocall__attendee__status-in-call">
               <span class="is-muted" data-label="Mute audio">
                  <i class="fas fa-microphone"></i>
               </span>
               <span class="is-muted" data-label="Stop video">
                  <i class="fas fa-video"></i>
               </span>
            </div>
         </li>
      </ul>
   );
}

export default Attendees;
