import { SET_USER, LOAD_USER } from './user.actions.type';

const INITIAL_STATE = {
   user: null,
   token: '',
   isLoggedIn: false
};

export default (state = INITIAL_STATE, action) => {
   console.log('ACTION ', action);
   const { type, payload } = action;
   switch (type) {
      case SET_USER:
         return {
            ...state.user,
            user: payload.user
         };

      default:
         return state;
   }
};
