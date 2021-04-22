//  prettier-ignore
import { ADD_NEW_MSG, LOAD_CHAT_MSGS } from './msg.action.types';
import * as utils from '../../utils';

export const addLoadedChatMsgs = (chatId, msgs) => ({
   type: LOAD_CHAT_MSGS,
   payload: { chatId, msgs }
});

export const addNewMsg = (chatId, msg) => ({
   type: ADD_NEW_MSG,
   payload: { chatId, msg }
});

export const loadChatMsgs = (authToken, chatId) => {
   return async dispatch => {
      try {
         const response = await utils.API.fetchChatMsgs(authToken, chatId);
         const { msgs } = await response.json();
         dispatch(
            addLoadedChatMsgs(chatId, [
               ...msgs.map(m => ({
                  ...m,
                  isRead: m.receiver !== chatId && true // This condition doesnt work yet
               }))
            ])
         );
      } catch (err) {
         console.log('ERR', err);
      }
   };
};
