import { createSelector } from 'reselect';

export const selectChatState = state => state.chat;

export const selectChats = createSelector(
   [selectChatState],
   chat => chat.chats
);

export const selectIsLoadingChatMsgs = chatId =>
   createSelector(
      [selectChats],
      chats => chats.find(chat => chat.id === chatId).isLoadingMsgs
   );
