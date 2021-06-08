import React, { useState } from 'react';
import './NavbarSearch.scss';

const NavbarSearch = function (props) {
   return (
      <div className="navbar__search">
         <input
            type="text"
            className="navbar__search-input"
            placeholder="Search people"
         />
         {/* <div className="navbar__search-suggestions">
            <div className="navbar__search-suggestion">
               <img
                  src="../../../img/realtor-3.jpeg"
                  alt=""
                  className="navbar__search-suggestion__photo pic pic--xsm"
               />
               <div className="navbar__search-suggestion__user-info">
                  <span className="navbar__search-suggestion__username">
                     Chima Divine
                  </span>
                  <span className="navbar__search-suggestion__mutual-friends">
                     3 mutual friends
                  </span>
               </div>
               <button className="btn btn-md btn-primary navbar__search-suggestion-addfriend">
                  Add friend
               </button>
            </div>
            <div className="navbar__search-suggestion">
               <img
                  src="../../../img/realtor-3.jpeg"
                  alt=""
                  className="navbar__search-suggestion__photo pic pic--xsm"
               />
               <div className="navbar__search-suggestion__user-info">
                  <span className="navbar__search-suggestion__username">
                     Chima Divine
                  </span>
                  <span className="navbar__search-suggestion__mutual-friends">
                     3 mutual friends
                  </span>
               </div>
               <button className="btn btn-md btn-primary navbar__search-suggestion-addfriend">
                  Add friend
               </button>
            </div>
            <div className="navbar__search-suggestion">
               <img
                  src="../../../img/realtor-3.jpeg"
                  alt=""
                  className="navbar__search-suggestion__photo pic pic--xsm"
               />
               <div className="navbar__search-suggestion__user-info">
                  <span className="navbar__search-suggestion__username">
                     Chima Divine
                  </span>
                  <span className="navbar__search-suggestion__mutual-friends">
                     3 mutual friends
                  </span>
               </div>
               <button className="btn btn-md btn-primary navbar__search-suggestion-addfriend">
                  Add friend
               </button>
            </div>
         </div> */}
      </div>
   );
};

export default NavbarSearch;
