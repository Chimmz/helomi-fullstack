import React, { useState, useEffect } from 'react';
import { withRouter, useParams } from 'react-router-dom';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectUser } from '../redux/user/user.selectors';
import { selectChats } from '../redux/chat/chat.selectors';
import { addNewMsg } from '../redux/msg/msg.actions.creators';
import { setSomeoneIsTyping } from '../redux/chat/chat.action.creators';

import io from 'socket.io-client';
import TextInput from './formUI/TextInput';
import './Icon.scss';
import './Chat-footer.scss';

const socket = io.connect('/');

socket.onAny((evt, ...args) => {
   console.log(`EVENT: ${evt}, ARGS: ${args}`);
});

function ChatFooter({ user: { currentUser }, allChats, dispatch }) {
   const currentChat = useParams().id;
   const [newMsg, setNewMsg] = useState('');

   useEffect(() => {
      socket.emit('join-self', currentUser._id);
      socket.on('new-msg-in', ({ newMsg, status }) => {
         status === 'success' && dispatch(addNewMsg(newMsg.sender, newMsg));
      });
      socket.on('user-is-typing', ({ typist: chatId, isTyping }) => {
         dispatch(setSomeoneIsTyping({ chatId, isTyping }));
      });
      return () => socket.disconnect();
   }, []);

   useEffect(() => {
      socket.emit('typing', {
         typist: currentUser._id,
         allChats: allChats.map(chat => chat._id),
         isTyping: Boolean(newMsg.length)
      });
   }, [newMsg]);

   const sendMessage = ev => {
      ev?.preventDefault();
      const sentAt = new Date();

      socket.emit('private-msg-out', {
         from: currentUser._id,
         sendTo: currentChat,
         text: newMsg,
         sentAt
      });
      dispatch(
         addNewMsg(currentChat, {
            sender: currentUser._id,
            receiver: currentChat,
            text: newMsg,
            createdAt: sentAt
         })
      );
      setNewMsg('');
   };

   const onChange = ev => {
      setNewMsg(ev.target.value);
   };

   return (
      <div className="chatting-section__footer">
         <div className="icon">
            <i className="fas fa-file-invoice"></i>
         </div>
         <div className="icon">
            <i className="far fa-laugh"></i>
         </div>

         <form className="new-msg" onSubmit={sendMessage}>
            <div className="new-msg__group">
               <TextInput
                  type="text"
                  className="textfield textfield--message new-msg__input"
                  placeholder="Type a message"
                  value={newMsg}
                  onChange={onChange}
               />
               <div className="icon" onClick={() => setNewMsg('')}>
                  &times;
               </div>
            </div>
            <div className="icon" onClick={() => sendMessage()} type="submit">
               <i className="fas fa-paper-plane"></i>
            </div>
         </form>
      </div>
   );
}

const mapStateToProps = createStructuredSelector({
   user: selectUser,
   allChats: selectChats
});
export default withRouter(connect(mapStateToProps)(ChatFooter));
