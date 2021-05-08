import React, { useState, useEffect, useContext } from 'react';
import { withRouter, useParams } from 'react-router-dom';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectUser } from '../redux/user/user.selectors';
import { selectChats } from '../redux/chat/chat.selectors';

import { socketContext } from '../contexts/SocketProvider';

import TextInput from './formUI/TextInput';
import './Icon.scss';
import './Chat-footer.scss';

function ChatFooter({ user: { currentUser }, allChats, dispatch }) {
   const currentChat = useParams().id;
   const { socket, socketEmitPrivateMsgOut } = useContext(socketContext);
   const [newMsg, setNewMsg] = useState('');

   useEffect(() => {
      socket.emit('typing', {
         typist: currentUser._id,
         allChats: allChats.map(chat => chat._id),
         isTyping: Boolean(newMsg.length)
      });
   }, [newMsg]);

   const sendMessage = ev => {
      ev?.preventDefault();
      socketEmitPrivateMsgOut({
         from: currentUser._id,
         sendTo: currentChat,
         text: newMsg,
         sentAt: new Date()
      });
      setNewMsg('');
   };

   const onChange = ev => setNewMsg(ev.target.value);

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
