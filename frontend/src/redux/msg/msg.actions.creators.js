import { ADD_NEW_MSG, FETCH_CHAT_MSGS } from './msg.action.types';
import * as utils from '../../utils';
import * as chatActionCreators from '../chat/chat.action.creators';

export const addFetchedChatMsgs = (chatId, msgs) => ({
   type: FETCH_CHAT_MSGS,
   payload: { chatId, msgs }
});

export const addNewMsg = (chatId, msg) => ({
   type: ADD_NEW_MSG,
   payload: { chatId, msg }
});

export const fetchChatMsgs = (authToken, chatId) => {
   return async dispatch => {
      try {
         const response = await utils.API.fetchChatMsgs(authToken, chatId);
         const { msgs } = await response.json();
         dispatch(addFetchedChatMsgs(chatId, msgs));
         dispatch(
            chatActionCreators.setChatMsgsLoading({ chatId, isLoading: false })
         );
      } catch (err) {
         console.log('ERR', err);
         dispatch(
            chatActionCreators.setChatMsgsLoading({ chatId, isLoading: true })
         );
      }
   };
};
