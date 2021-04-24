import { createSelector } from 'reselect';

export const selectChatState = state => state.chat;

export const selectChats = createSelector(
   [selectChatState],
   chat => chat.chats
);
