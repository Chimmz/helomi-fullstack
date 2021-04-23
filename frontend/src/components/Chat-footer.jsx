import React, { useState, useEffect } from 'react';
import { withRouter, useParams } from 'react-router-dom';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectUser } from '../redux/user/user.selectors';
import { addNewMsg } from '../redux/msg/msg.actions.creators';

import io from 'socket.io-client';
import TextInput from './formUI/TextInput';
import './Icon.scss';
import './Chat-footer.scss';

const socket = io.connect('/');

socket.onAny((evt, ...args) => {
   console.log(`EVENT: ${evt}, ARGS: ${args}`);
});

function ChatFooter({ user: { currentUser }, dispatch }) {
   const [newMsg, setNewMsg] = useState('');
   const currentChat = useParams().id;

   useEffect(() => {
      socket.emit('join-self', currentUser._id);
      socket.on('new-msg-in', ({ newMsg, status }) => {
         // alert(newMsg.text);
         console.log('NEW MSG', newMsg);
         status === 'success' && dispatch(addNewMsg(newMsg.sender, newMsg));
      });
      return () => socket.disconnect();
   }, []);

   const sendMessage = ev => {
      ev && ev.preventDefault();
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
      if (newMsg) {
         // Implement 'is typing' here...
         // socket.to(currentChat).emit('is-typing', {whoIsTyping: currentUser})
      }
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
   user: selectUser
});
export default withRouter(connect(mapStateToProps)(ChatFooter));
