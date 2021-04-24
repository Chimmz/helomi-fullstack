import { SET_CHATS, SOMEONE_IS_TYPING } from './chat.action.types';

const initState = {
   chats: {},
   isLoading: true
};

const chatReducer = (state = initState, action) => {
   const { type, payload } = action;
   switch (type) {
      case SET_CHATS:
         return {
            ...state,
            chats: payload.chats.map(chat => ({ ...chat, isTyping: false }))
         };

      case SOMEONE_IS_TYPING:
         return {
            ...state,
            chats: state.chats.map(chat =>
               chat._id === payload.chatId
                  ? { ...chat, isTyping: true }
                  : { ...chat }
            )
         };

      default:
         return state;
   }
};

export default chatReducer;
