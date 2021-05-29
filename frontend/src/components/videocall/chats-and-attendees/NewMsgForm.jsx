import React, { useState, useContext } from 'react';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectVideoChatRoomId } from '../../../redux/videocall/videocall.selectors';
import { selectCurrentUser } from '../../../redux/user/user.selectors';

import { socketContext } from '../../../contexts/SocketProvider';
import '../../Icon.scss';
import './NewMsgForm.scss';

function NewMsgForm({ currentUser, videoChatRoom }) {
   const { socket } = useContext(socketContext);
   const [newText, setNewText] = useState('');

   const handleChange = ev => setNewText(ev.target.value);

   const sendNewMsg = function (ev) {
      ev?.preventDefault();
      const { _id, username } = currentUser;

      socket.emit('send-video-call-msg', {
         msg: newText,
         sender: { _id, username },
         room: videoChatRoom
      });
      setNewText('');
   };

   return (
      <form className="newmsg" onSubmit={sendNewMsg}>
         <input
            type="text"
            value={newText}
            className="input"
            onChange={handleChange}
            placeholder="Type a new message here"
         />
         <span
            className="send icon icon--sm icon--bg-blue"
            onClick={sendNewMsg}
         >
            <i className="fas fa-paper-plane"></i>
         </span>
      </form>
   );
}
const mapStateToProps = createStructuredSelector({
   currentUser: selectCurrentUser,
   videoChatRoom: selectVideoChatRoomId
});
export default connect(mapStateToProps, null)(NewMsgForm);
