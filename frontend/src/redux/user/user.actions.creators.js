// prettier-ignore
import { AUTH_ERROR, LOAD_USER, LOGOUT_USER, RESET_USER, SET_USER } from './user.actions.type';

export const setUser = (user = null, token = '') => {
   // localStorage.setItem('HELOMI_USER', JSON.stringify(user));
   // localStorage.setItem('HELOMI_USER_TOKEN', `${token}`);
   return { type: SET_USER, payload: { user, token } };
};

export const loadUser = () => ({ type: LOAD_USER });
export const authError = () => ({ type: AUTH_ERROR });
export const resetUser = () => ({ type: RESET_USER });
export const logoutUser = () => ({ type: LOGOUT_USER });
