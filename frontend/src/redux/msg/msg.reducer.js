// prettier-ignore
import { ADD_NEW_UNREAD_MSG, GET_MSGS, SET_RECENT_MSGS } from './msg.action.types';

const initialState = {
   recentMsgs: [],
   newUnreadMsgs: []
};

const msgReducer = (state = initialState, action) => {
   switch (action.type) {
      case SET_RECENT_MSGS:
         return { ...state, recentMsgs: action.payload.msgs };

      case ADD_NEW_UNREAD_MSG:
         return {
            ...state,
            newUnreadMsgs: [...state.newUnreadMsgs, action.payload.msg]
         };

      default:
         return state;
   }
};
export default msgReducer;
