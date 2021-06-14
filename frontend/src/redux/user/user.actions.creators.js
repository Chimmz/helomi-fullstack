// prettier-ignore
import { AUTH_ERROR, LOAD_USER, LOGOUT_USER, RESET_USER, SET_USER} from './user.actions.type';
import * as utils from '../../utils';
import { addAndRemoveAlert } from '../alert/alert.utils';
import { v4 as uuidv4 } from 'uuid';
import { addAlert, removeAlert } from '../alert/alert.action.creators';
import { setChats } from '../chat/chat.action.creators';
import { RESET_CHATS } from '../chat/chat.action.types';
import { RESET_MSGS } from '../msg/msg.action.types';

export const setUser = (user = null, token = '') => {
   // delete user.friends;
   return { type: SET_USER, payload: { user, token } };
};

export const loadUser = () => ({ type: LOAD_USER });
export const authError = () => ({ type: AUTH_ERROR });
export const resetUser = () => ({ type: RESET_USER });

export const logOutUser = () => dispatch => {
   dispatch({ type: LOGOUT_USER });
   dispatch({ type: RESET_CHATS });
   dispatch({ type: RESET_MSGS });
};

export const loginUser = loginData => {
   return async dispatch => {
      const res = await utils.API.login(loginData);
      const alertId = uuidv4();
      switch (res.status) {
         case 'success':
            // prettier-ignore
            addAndRemoveAlert(
               () => dispatch(
                  addAlert({ text: 'You have been successfully logged in', type: 'success', id: alertId
               })),
               () => dispatch(removeAlert(alertId))
            );
            dispatch(setUser(res.data.user, res.token));
            dispatch(setChats(res.data.user.friends));
            break;

         case 'fail':
            // prettier-ignore
            addAndRemoveAlert(
               () => dispatch(addAlert({ text: `${res.message}`, type: 'warning', id: alertId })),
               () => dispatch(removeAlert(alertId))
            );
            dispatch(authError());
            break;

         case 'error':
            // prettier-ignore
            addAndRemoveAlert(
               () => dispatch(
                  addAlert({
                     text: 'Sorry, we could not log you in. Please check your internet connection',
                     type: 'warning',
                     id: alertId
                  })),
               () => dispatch(removeAlert(alertId))
            );
         default:
      }
      console.log(res);
   };
};

export const signupUser = signupData => {
   return async dispatch => {
      const res = await utils.API.signup(signupData);
      const alertId = uuidv4();
      console.log(res);
      switch (res.status) {
         case 'success':
            // prettier-ignore
            addAndRemoveAlert(
               () => dispatch(
                  addAlert({ text: 'You have been successfully logged in', type: 'success', id: alertId
               })),
               () => dispatch(removeAlert(alertId))
            );
            dispatch(resetUser());
            dispatch(setUser(res.data.user, res.token));
            break;

         case 'error':
            // prettier-ignore
            addAndRemoveAlert(
               () => dispatch(addAlert({ text: `${res.message}`, type: 'warning', id: alertId })),
               () => dispatch(removeAlert(alertId))
            )
            authError();
            break;
         default:
      }
   };
};
