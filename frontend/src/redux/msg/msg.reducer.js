// prettier-ignore
import * as actionTypes from './msg.action.types';

const initialState = {
   messages: {}
};

const msgReducer = (state = initialState, action) => {
   const { type, payload } = action;
   switch (type) {
      case actionTypes.LOAD_CHAT_MSGS:
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

      default:
         return state;
   }
};
export default msgReducer;
