import React from 'react';
import './Textmsg.scss';

function Textmsg({ msg }) {
   return (
      <div className={`textmsg textmsg--${msg.direction}`}>
         <p className="textmsg__content">{msg.text}</p>
         <p className="textmsg__time">{msg.time}</p>
      </div>
   );
}

export default Textmsg;
