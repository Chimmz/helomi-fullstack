import React from 'react';
import './Textmsg.scss';

function Textmsg() {
   return (
      <>
         <div className="textmsg textmsg--incoming">
            <span className="textmsg__content">
               Hey bro!! How’ve you been?! I’ve been searching
            </span>
            <p className="textmsg__time">2:36 PM</p>
         </div>
         <div className="textmsg textmsg--outgoing textmsg--not-sent">
            <p className="textmsg__content">
               Hey bro!! How’ve you been?! I’ve been searching for your number.
               Have you been around?
            </p>
            <p className="textmsg__time">Today, 2:36 PM</p>
            <p className="textmsg__err-msg">This message couldn't send</p>
         </div>
         <div className="textmsg textmsg--incoming">
            <p className="textmsg__content">
               Hey bro!! How’ve you been?! I’ve been searching for your number.
               Have you been around?
            </p>
            <p className="textmsg__time">Today, 2:36 PM</p>
         </div>
      </>
   );
}

export default Textmsg;
