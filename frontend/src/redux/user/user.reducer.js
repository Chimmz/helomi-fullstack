// prettier-ignore
import { SET_USER, LOAD_USER, AUTH_ERROR, RESET_USER, LOGOUT_USER, USER_LOADED } from './user.actions.type';

const INITIAL_STATE = {
   currentUser: null,
   token: '',
   isLoggedIn: false,
   isLoading: true
};

const userReducer = (state = INITIAL_STATE, action) => {
   const { type, payload } = action;
   switch (type) {
      case LOAD_USER:
         const tokenInStorage = localStorage.getItem('HELOMI_USER_TOKEN') || '';
         // prettier-ignore
         return {
            ...state,
            currentUser: JSON.parse(localStorage.getItem('HELOMI_USER')) || null,
            token: tokenInStorage,
            isLoggedIn: tokenInStorage ? true : false
         };

      case SET_USER:
         return {
            ...state,
            currentUser: payload.user,
            token: payload.token,
            isLoggedIn: true,
            isLoading: false
         };

      case AUTH_ERROR:
      case RESET_USER:
      case LOGOUT_USER:
         localStorage.removeItem('HELOMI_USER');
         localStorage.removeItem('HELOMI_USER_TOKEN');
         return {
            currentUser: null,
            token: '',
            isLoggedIn: false,
            isLoading: false
         };

      default:
         return state;
   }
};

export default userReducer;
