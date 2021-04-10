import { GET_MSGS, SET_RECENT_MSGS } from './msg.action.types';

export const loadChatMsgs = (authToken, chatId) => {
   return async function (dispatch) {
      try {
         const response = await fetch(
            `http://localhost:5000/users/friends/${chatId}/msgs`,
            { method: 'GET', headers: { Authorization: `Bearer ${authToken}` } }
         );
         const { msgs } = await response.json();

         dispatch({
            type: SET_RECENT_MSGS,
            payload: { msgs }
         });
      } catch (err) {
         console.log(err);
      }
   };
};
