const makeRequest = function ({ url, requestType, body, headers }) {
   return fetch(url, { method: requestType, body, headers })
      .then(response => response.json())
      .catch(err => {
         console.log(err);
      });
};

class APIRequest {
   signup({ username, password, email }) {
      return makeRequest({
         url: '/users/signup',
         requestType: 'POST',
         body: JSON.stringify({ username, email, password }),
         headers: { 'Content-Type': 'application/json' }
      });
   }

   login({ username, password }) {
      return makeRequest({
         url: '/users/login',
         requestType: 'POST',
         body: JSON.stringify({ username, password }),
         headers: { 'Content-Type': 'application/json' }
      });
   }

   fetchChatMsgs(authToken, chatId) {
      return fetch(`/privatemsg/friends/${chatId}/msgs`, {
         method: 'GET',
         headers: { Authorization: `Bearer ${authToken}` }
      });
   }

   searchPeople(authToken, queryStr) {
      return fetch(`/friends/search-people?username=${queryStr}`, {
         method: 'GET',
         headers: { Authorization: `Bearer ${authToken}` }
      })
         .then(response => response.json())
         .catch(err => err);
   }

   addUserAsFriend(authToken, userId) {
      return fetch(`/friends/add/${userId}`, {
         method: 'POST',
         headers: { Authorization: `Bearer ${authToken}` }
      })
         .then(response => response.json())
         .catch(err => err);
   }

   deleteFriend(authToken, chatId) {
      return fetch(`/friends/${chatId}`, {
         method: 'DELETE',
         headers: { Authorization: `Bearer ${authToken}` }
      })
         .then(response => response.json())
         .catch(err => err);
   }
   updateUser(authToken, form) {
      return fetch(`/users/update-my-profile`, {
         method: 'PATCH',
         headers: {
            Authorization: `Bearer ${authToken}`
         },
         body: form
      })
         .then(response => response.json())
         .catch(err => err);
   }
   authenticateToken(authToken) {
      return fetch(`/users/auth`, {
         method: 'GET',
         headers: { Authorization: `Bearer ${authToken}` }
      })
         .then(response => response.json())
         .catch(err => err);
   }
}
export const API = new APIRequest();
