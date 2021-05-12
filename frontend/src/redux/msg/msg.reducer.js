// prettier-ignore
import * as actionTypes from './msg.action.types';

const initialState = {
   messages: {}
};

const msgReducer = (state = initialState, action) => {
   const { type, payload } = action;
   switch (type) {
      case actionTypes.FETCH_CHAT_MSGS:
         const { chatId, msgs } = payload;
         return {
            ...state,
            messages: {
               ...state.messages,
               [chatId]: state.messages[chatId]?.length
                  ? [...msgs, ...state.messages[chatId]]
                  : [...msgs]
            }
         };

      case actionTypes.ADD_NEW_MSG:
         let { chatId: id, msg } = payload;
         return {
            ...state,
            messages: {
               ...state.messages,
               [id]: state.messages[id]?.length
                  ? [...state.messages[id], msg]
                  : [msg]
            }
         };

      case actionTypes.MARK_MSGS_AS_READ:
         let { msgIds, chatId: chId } = payload;
         console.log(msgIds, state.messages[chId]);
         return {
            ...state,
            messages: {
               ...state.messages,
               [chId]: state.messages[chId].map(msg =>
                  msgIds.includes(msg._id)
                     ? { ...msg, isRead: true }
                     : { ...msg }
               )
            }
         };

      default:
         return state;
   }
};
export default msgReducer;
