// prettier-ignore
import { ADD_NEW_MSG, LOAD_CHAT_MSGS } from './msg.action.types';

const initialState = {
   messages: {},
   isLoaded: false
};

const msgReducer = (state = initialState, action) => {
   const { type, payload } = action;
   switch (type) {
      case LOAD_CHAT_MSGS:
         const { chatId, msgs } = payload;
         return {
            ...state,
            isLoaded: true,
            messages: {
               ...state.messages,
               [chatId]: state.messages[chatId]?.length
                  ? [...msgs, ...state.messages[chatId]]
                  : [...msgs]
            }
         };
         break;

      case ADD_NEW_MSG:
         let { chatId: id, msg } = payload; // chatId renamed to id
         return {
            ...state,
            messages: {
               ...state.messages,
               [id]: state.messages[id]?.length
                  ? [...state.messages[id], msg]
                  : [msg]
            }
         };
         break;
      default:
         return state;
   }
};
export default msgReducer;
