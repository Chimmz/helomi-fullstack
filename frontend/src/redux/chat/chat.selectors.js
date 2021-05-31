import { createSelector } from 'reselect';

export const selectChatState = state => state.chat;
const actualCall = state => state.videocall.call;

export const selectChats = createSelector(
   [selectChatState],
   chat => chat.chats
);

export const selectIsLoadingChatMsgs = chatId =>
   createSelector(
      [selectChats],
      chats => chats.find(chat => chat.id === chatId).isLoadingMsgs
   );

export const selectCallerInChat = createSelector(
   [selectChats, actualCall],
   (chats, call) => chats.find(chat => chat._id === call.caller)
);
