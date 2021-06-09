class APIRequest {
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
         .catch(err => {
            console.log(err);
         });
   }

   fetchChatMsgs(authToken, chatId) {
      return fetch(`http://localhost:5000/privatemsg/friends/${chatId}/msgs`, {
         method: 'GET',
         headers: { Authorization: `Bearer ${authToken}` }
      });
   }

   searchPeople(authToken, queryStr) {
      return fetch(
         `http://localhost:5000/friends/search-people?username=${queryStr}`,
         {
            method: 'GET',
            headers: { Authorization: `Bearer ${authToken}` }
         }
      )
         .then(response => response.json())
         .catch(err => err);
   }

   addUserAsFriend(authToken, userId) {
      return fetch(`http://localhost:5000/friends/add/${userId}`, {
         method: 'POST',
         headers: { Authorization: `Bearer ${authToken}` }
      })
         .then(response => response.json())
         .catch(err => err);
   }
}

export const API = new APIRequest();

export function getEmptyFields(dataObject) {
   return Object.keys(dataObject).filter(key => !dataObject[key]);
}

export function toFirstLetterUpper(str) {
   return str[0].toUpperCase() + str.slice(1).toLowerCase();
}
