import React from 'react';
import { NavLink, Link } from 'react-router-dom';

import './Chat.scss';

function Chat({ chat }) {
   return (
      <>
         <NavLink
            to={`/chats/${chat._id}`}
            className="chat "
            activeClassName="chat--active"
         >
            <img
               src="img/realtor-3.jpeg"
               alt=""
               className="chat__photo pic pic--sm"
            />
            <div className="chat__info">
               <span className="chat__name">{chat.username}</span>
               <span className="chat__lastmessage">Hey, where did you go?</span>
            </div>
            <span className="chat__time">2:35 PM</span>
         </NavLink>
      </>
   );
}
export default Chat;
