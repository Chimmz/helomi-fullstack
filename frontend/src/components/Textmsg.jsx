import React from 'react';
import './Textmsg.scss';

function Textmsg() {
   return (
      <>
         <div class="textmsg textmsg--incoming">
            <span class="textmsg__content">
               Hey bro!! How’ve you been?! I’ve been searching
            </span>
            <p class="textmsg__time">2:36 PM</p>
         </div>
         <div class="textmsg textmsg--outgoing textmsg--not-sent">
            <p class="textmsg__content">
               Hey bro!! How’ve you been?! I’ve been searching for your number.
               Have you been around?
            </p>
            <p class="textmsg__time">Today, 2:36 PM</p>
            <p class="textmsg__err-msg">This message couldn't send</p>
         </div>
         <div class="textmsg textmsg--incoming">
            <p class="textmsg__content">
               Hey bro!! How’ve you been?! I’ve been searching for your number.
               Have you been around?
            </p>
            <p class="textmsg__time">Today, 2:36 PM</p>
         </div>
      </>
   );
}

export default Textmsg;
