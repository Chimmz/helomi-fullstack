// prettier-ignore
import { SET_USER, LOAD_USER, AUTH_ERROR, RESET_USER } from './user.actions.type';

const INITIAL_STATE = {
   currentUser: null,
   token: '',
   isLoggedIn: false
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
            isLoggedIn: tokenInStorage && true
         };

      case SET_USER:
         return {
            currentUser: payload.user,
            token: payload.token,
            isLoggedIn: true
         };

      case AUTH_ERROR:
      case RESET_USER:
         localStorage.removeItem('HELOMI_USER');
         localStorage.removeItem('HELOMI_USER_TOKEN');
         return {
            currentUser: null,
            token: '',
            isLoggedIn: false
         };

      default:
         return state;
   }
};

export default userReducer;
