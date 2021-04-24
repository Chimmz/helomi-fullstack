import * as utils from '../../utils';
import { SET_CHATS, SOMEONE_IS_TYPING } from './chat.action.types';

export const setChats = chats => {
   return dispatch => {
      console.log(chats);
      dispatch({
         type: SET_CHATS,
         payload: { chats }
      });
   };
};

export const setSomeoneIsTyping = chatId => ({
   type: SOMEONE_IS_TYPING,
   payload: { chatId }
});
