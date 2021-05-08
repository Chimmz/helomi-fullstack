import React, { createContext } from 'react';

import store from '../redux/store';
import { addNewMsg } from '../redux/msg/msg.actions.creators';
import { setSomeoneIsTyping } from '../redux/chat/chat.action.creators';
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

export const socketContext = createContext();

export const SocketProvider = props => (
   <socketContext.Provider value={{ socket, socketEmitPrivateMsgOut }}>
      {props.children}
   </socketContext.Provider>
);
