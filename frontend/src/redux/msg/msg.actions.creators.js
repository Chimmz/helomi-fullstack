import * as actionTypes from './msg.action.types';
import * as utils from '../../utils';
import * as actionCreators from '../chat/chat.action.creators';

export const addFetchedChatMsgs = (chatId, msgs) => ({
   type: actionTypes.FETCH_CHAT_MSGS,
   payload: { chatId, msgs }
});

export const addNewMsg = (chatId, msg) => ({
   type: actionTypes.ADD_NEW_MSG,
   payload: { chatId, msg }
});

export const fetchChatMsgs = (authToken, chatId) => {
   return async dispatch => {
      try {
         const response = await utils.API.fetchChatMsgs(authToken, chatId);
         const { msgs } = await response.json();
         dispatch(addFetchedChatMsgs(chatId, msgs));
         dispatch(
            actionCreators.setChatMsgsLoading({ chatId, isLoading: false })
         );
      } catch (err) {
         console.log('ERR', err);
         dispatch(
            actionCreators.setChatMsgsLoading({ chatId, isLoading: true })
         );
      }
   };
};

export const markMsgsAsRead = msgs => ({
   type: actionTypes.MARK_MSGS_AS_READ,
   payload: { msgs }
});
