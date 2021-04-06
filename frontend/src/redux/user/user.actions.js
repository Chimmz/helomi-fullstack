import { SET_USER } from './user.actions.type';

export const signup = ({ username, email, password }) => {
   try {
      const response = fetch('http://localhost:5000/users/signup', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({ username, email, password })
      }).then(response => response.json());

      response.then(dataResolved => {
         console.log(dataResolved);
         return { type: SET_USER, payload: { user: dataResolved.user } };
      });
   } catch (err) {
      console.log('ERROR');
      return {
         type: 'ERROR'
      };
   }
};
