import { createSelector } from 'reselect';

export const selectMsg = state => state.msg;

export const selectAllMsgs = createSelector([selectMsg], msg => msg.messages);

export const selectChatMsgs = chatId => {
   return createSelector([selectMsg], msg => msg.messages[chatId]);
};

export const selectLastMsg = chatId => {
   return createSelector([selectMsg], msg => msg.messages[chatId]);
};
