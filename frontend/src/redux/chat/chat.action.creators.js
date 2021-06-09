import { API } from '../../utils';
import { v4 as uuidv4 } from 'uuid';
import {
   SET_CHATS,
   ADD_CHAT,
   SET_CHAT_MSGS_LOADING,
   SOMEONE_IS_TYPING
} from './chat.action.types';
import { addAlert } from '../alert/alert.action.creators';

export const setChats = chats => {
   return dispatch => {
      console.log(chats);
      dispatch({
         type: SET_CHATS,
         payload: { chats }
      });
   };
};

export const setSomeoneIsTyping = ({ chatId, isTyping }) => ({
   type: SOMEONE_IS_TYPING,
   payload: { chatId, isTyping }
});

export const setChatMsgsLoading = ({ chatId, isLoading }) => ({
   type: SET_CHAT_MSGS_LOADING,
   payload: { chatId, isLoading }
});

export const addUserAsFriend = (authToken, userId) => async dispatch => {
   try {
      const response = await API.addUserAsFriend(authToken, userId);
      const newAlert = { id: uuidv4() };

      switch (response.status) {
         case 'success':
            console.log(response);
            const addedUser = response.user;
            delete addedUser.friends;

            dispatch({ type: ADD_CHAT, payload: { chat: addedUser } });
            dispatch(
               addAlert({
                  ...newAlert,
                  type: 'success',
                  text: `${addedUser.username} is now your friend`
               })
            );
            break;
         case 'fail':
            dispatch(
               addAlert({
                  ...newAlert,
                  type: 'warning',
                  text: `${response.message}`
               })
            );
            break;
         case 'error':
            dispatch(
               addAlert({
                  ...newAlert,
                  type: 'warning',
                  text: `Friend couldn't be added. Please check your internet connection`
               })
            );
            break;
      }
      console.log('In chat creators:', response);
   } catch (err) {
      console.log('In chat creators:', err);
   }
};
