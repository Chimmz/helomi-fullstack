import React from 'react';
import { NavLink } from 'react-router-dom';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectAllMsgs } from '../redux/msg/msg.selectors';
import { selectCurrentUser } from '../redux/user/user.selectors';

import './Chat.scss';
import { getMsgSentTime } from '../redux/msg/msg.utils';

function Chat({ chat, allReduxMsgs, currentUser }) {
   const lastChatMsg = allReduxMsgs[chat._id]?.slice(-1).pop() || ''; // 'auto' should be replaced with initial data from backend

   const showLastMsgAsUnread =
      currentUser.id === lastChatMsg.sender ? false : !lastChatMsg.isRead;

   const unreadMsgsCount =
      allReduxMsgs[chat._id]?.reduce((accum, msg) => {
         return msg.sender === chat._id && !msg.isRead ? accum + 1 : accum + 0;
      }, 0) || '';

   return (
      <NavLink
         to={`/chats/${chat._id}`}
         className="chat chat--has-unread-messages"
         activeClassName="chat--active"
      >
         <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTT9ho0lI0YvJexoiXfCuKSVGaDDq5LanKzAA&usqp=CAU"
            alt=""
            className="chat__photo pic pic--sm"
         />
         <div className="chat__info ">
            <span className="chat__name">{chat.username}</span>
            {chat.isTyping ? (
               <span className="chat__is-typing">typing...</span>
            ) : (
               <span
                  className={`chat__lastmessage chat__lastmessage--${
                     showLastMsgAsUnread && 'unread'
                  }`}
               >
                  {lastChatMsg.text}
               </span>
            )}
            {unreadMsgsCount && (
               <span className="unread-messages-count">{unreadMsgsCount}</span>
            )}
         </div>
         <span className="chat__time">2:35 PM</span>
      </NavLink>
   );
}

const mapState = createStructuredSelector({
   allReduxMsgs: selectAllMsgs,
   currentUser: selectCurrentUser
});
export default connect(mapState)(Chat);
