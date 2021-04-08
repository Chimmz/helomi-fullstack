export function getEmptyFields(dataObject) {
   return Object.keys(dataObject).filter(key => !dataObject[key]);
}

export class API {
   signup({ username, password, email }) {
      return fetch('http://localhost:5000/users/signup', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({ username, email, password })
      })
         .then(response => response.json())
         .catch(err => err);
   }

   login({ username, password }) {
      return fetch('http://localhost:5000/users/login', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({ username, password })
      })
         .then(response => response.json())
         .catch(err => err);
   }
}
