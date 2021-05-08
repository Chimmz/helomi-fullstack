// prettier-ignore
import { SET_CHATS, SET_CHAT_MSGS_LOADING, SOMEONE_IS_TYPING } from './chat.action.types';

export const setChats = chats => {
   return dispatch => {
      console.log(chats);
      dispatch({
         type: SET_CHATS,
         payload: { chats }
      });
   };
};

export const setSomeoneIsTyping = ({ chatId, isTyping }) => ({
   type: SOMEONE_IS_TYPING,
   payload: { chatId, isTyping }
});

export const setChatMsgsLoading = ({ chatId, isLoading }) => ({
   type: SET_CHAT_MSGS_LOADING,
   payload: { chatId, isLoading }
});
