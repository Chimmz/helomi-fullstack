import React, { useState } from 'react';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { addUserAsFriend } from '../../../redux/chat/chat.action.creators';
import { selectUser } from '../../../redux/user/user.selectors';
import { API } from '../../../utils';

import './NavbarSearch.scss';

function NavbarSearch({ user, dispatch }) {
   const authToken = user.token;
   const [searchQuery, setSearchQuery] = useState('');
   const [searchResults, setSearchResults] = useState([]);

   const searchPeople = async function (query) {
      try {
         const response = await API.searchPeople(authToken, query);
         console.log(response.users);
         setSearchResults(response.users);
      } catch (err) {}
   };

   const handleChange = ev => {
      const { value } = ev.target;
      setSearchQuery(value);

      if (!value) setSearchResults([]);
      else searchPeople(value);
   };

   return (
      <div className="navbar__search">
         <input
            type="text"
            className={`navbar__search-input navbar__search-input--${
               searchResults.length && 'is-showing-suggestions'
            }`}
            placeholder="Search people"
            value={searchQuery}
            onChange={handleChange}
         />
         {searchResults.length && searchQuery ? (
            <div className="navbar__search-suggestions">
               {searchResults.map(user => (
                  <div className="navbar__search-suggestion" key={user._id}>
                     <img
                        src="../../../img/realtor-3.jpeg"
                        alt=""
                        className="navbar__search-suggestion__photo pic pic--xsm"
                     />
                     <div className="navbar__search-suggestion__user-info">
                        <span className="navbar__search-suggestion__username">
                           {user.username}{' '}
                           <span className="navbar__search-suggestion__email">
                              {user.email}
                           </span>
                        </span>
                        <span className="navbar__search-suggestion__mutual-friends">
                           3 mutual friends
                        </span>
                     </div>
                     <button
                        className="btn btn-md btn-primary navbar__search-suggestion-addfriend"
                        onClick={() =>
                           dispatch(addUserAsFriend(authToken, user._id))
                        }
                     >
                        Add friend
                     </button>
                  </div>
               ))}
            </div>
         ) : (
            ''
         )}
      </div>
   );
}

const mapStateToProps = createStructuredSelector({
   user: selectUser
});
export default connect(mapStateToProps)(NavbarSearch);
