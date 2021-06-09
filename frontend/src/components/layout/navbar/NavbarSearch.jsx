import React, { useState } from 'react';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { addUserAsFriend } from '../../../redux/chat/chat.action.creators';
import {
   selectUser,
   selectCurrentUser
} from '../../../redux/user/user.selectors';
import { API } from '../../../utils';
import Overlay from '../../UI/Overlay';

import './NavbarSearch.scss';

function NavbarSearch({ user, currentUser, dispatch }) {
   const authToken = user.token;
   const [searchQuery, setSearchQuery] = useState('');
   const [searchResults, setSearchResults] = useState([]);
   const [isShowingSuggestions, setIsShowingSuggestions] = useState(false);

   const searchPeople = async function (query) {
      try {
         const response = await API.searchPeople(authToken, query);
         console.log(response.users);
         setSearchResults(response.users);

         if (response.users.length) setIsShowingSuggestions(true);
      } catch (err) {}
   };

   const handleChange = ev => {
      const { value } = ev.target;
      setSearchQuery(value);

      if (!value) setSearchResults([]);
      else searchPeople(value);
   };

   const handleClickAddBtn = () => {
      dispatch(addUserAsFriend(authToken, user._id));
      setIsShowingSuggestions(false);
   };

   return (
      <div className="navbar__search">
         <input
            type="text"
            className={`navbar__search-input navbar__search-input--${
               isShowingSuggestions && 'is-showing-suggestions'
            }`}
            placeholder="Search people"
            value={searchQuery}
            onChange={handleChange}
            onFocus={() =>
               searchResults.length && setIsShowingSuggestions(true)
            }
         />
         {isShowingSuggestions && (
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
                        onClick={handleClickAddBtn}
                     >
                        Add friend
                     </button>
                  </div>
               ))}
            </div>
         )}
         <Overlay
            showIf={isShowingSuggestions}
            transparent
            onClick={() => {
               setIsShowingSuggestions(false);
            }}
         />
      </div>
   );
}

const mapStateToProps = createStructuredSelector({
   user: selectUser,
   currentUser: selectCurrentUser
});
export default connect(mapStateToProps)(NavbarSearch);
