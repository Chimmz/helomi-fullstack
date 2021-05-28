import React, { createContext } from 'react';

import store from '../redux/store';
import { addNewMsg } from '../redux/msg/msg.actions.creators';
import { setSomeoneIsTyping } from '../redux/chat/chat.action.creators';
import { SET_RTC_CANDIDATE } from '../redux/videocall/videocall.action.types';
import { ring } from '../redux/videocall/videocall.action.creators';
import io from 'socket.io-client';

const socket = io.connect('/');

socket.onAny((evt, ...args) => {
   console.log(`EVENT: ${evt}, ARGS: ${args}`);
});

socket.on('new-msg-in', ({ newMsg, status }) => {
   status === 'success' && store.dispatch(addNewMsg(newMsg.sender, newMsg));
});

socket.on('user-is-typing', ({ typist: chatId, isTyping }) => {
   store.dispatch(setSomeoneIsTyping({ chatId, isTyping }));
});

function socketEmitPrivateMsgOut({ from, sendTo: receiver, text, sentAt }) {
   socket.emit('private-msg-out', { from, sendTo: receiver, text, sentAt });
   store.dispatch(
      addNewMsg(receiver, { sender: from, receiver, text, createdAt: sentAt })
   );
}

// For videoCall signals
socket.on('incoming-videocall', function (callDetails) {
   const { roomId, caller, offer } = callDetails;
   store.dispatch(ring(caller, roomId, offer));

   socket.on('candidate-in', function (candidate) {
      console.log('Candidate sent in');
      store.dispatch({ type: SET_RTC_CANDIDATE, payload: { candidate } });
   });
});

export const socketContext = createContext();

export const SocketProvider = props => (
   <socketContext.Provider value={{ socket, socketEmitPrivateMsgOut }}>
      {props.children}
   </socketContext.Provider>
);
