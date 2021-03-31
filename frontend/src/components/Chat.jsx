import React from 'react';
import { NavLink, Link } from 'react-router-dom';

import './Chat.scss';

function Chat() {
   return (
      <>
         <NavLink to="/chat/1" className="chat " activeClassName="chat--active">
            <img
               src="img/realtor-3.jpeg"
               alt=""
               className="chat__photo pic pic--sm"
            />
            <div className="chat__info">
               <span className="chat__name">Joe Wilson</span>
               <span className="chat__lastmessage">Hey, where did you go?</span>
            </div>
            <span className="chat__time">2:35 PM</span>
         </NavLink>

         <NavLink
            to="/chat/2"
            className="chat chat--has-unread-messages"
            activeClassName="chat--active"
         >
            <img
               src="img/realtor-3.jpeg"
               alt=""
               className="chat__photo pic pic--sm"
            />
            <div className="chat__info">
               <span className="chat__name">Rachel Richard</span>
               <span className="chat__lastmessage">Hey, where did you go?</span>
            </div>
            <span className="unread-messages-count">3</span>
            <span className="chat__time">2:35 PM</span>
         </NavLink>
      </>
   );
}
export default Chat;
