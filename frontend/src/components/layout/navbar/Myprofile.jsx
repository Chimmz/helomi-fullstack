import React, { useState } from 'react';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../../redux/user/user.selectors';
import { LOGOUT_USER } from '../../../redux/user/user.actions.type';

import { useToggle } from '../../../hooks/useToggle';
import './Myprofile.scss';
import { selectTotalChatCount } from '../../../redux/chat/chat.selectors';

const Myprofile = function ({ currentUser, totalChatCount, dispatch }) {
   const [showFullProfile, _, toggleShowFullProfile] = useToggle(false);
   const handleLogout = () => dispatch({ type: LOGOUT_USER });

   return (
      <div className="navbar__myprofile">
         <div className="navbar__loggedin-user" onClick={toggleShowFullProfile}>
            <img
               src="../../../../img/realtor-3.jpeg"
               alt=""
               className="navbar__photo pic pic--xsm"
            />
            <span className="navbar__username">{currentUser.username}</span>
         </div>

         {showFullProfile && (
            <div className="navbar__myprofile__dropdown">
               <div className="navbar__myprofile__dropdown__picture">
                  <img
                     src="../../../../img/realtor-3.jpeg"
                     alt=""
                     className="navbar__myprofile__dropdown__photo pic pic--lg"
                  />
                  <span className="changephoto">
                     <i className="fas fa-camera"></i>
                     Change photo
                  </span>
               </div>
               <span className="navbar__myprofile__dropdown__username">
                  {currentUser.username}
               </span>
               <span className="navbar__myprofile__dropdown__friendscount">
                  {totalChatCount} friends
               </span>
               <span className="navbar__myprofile__dropdown__datejoined">
                  Joined Mar. 24
               </span>
               <button
                  className="btn btn-md btn-primary logout"
                  onClick={handleLogout}
               >
                  Log out
               </button>
            </div>
         )}
      </div>
   );
};

const mapStateToProps = createStructuredSelector({
   currentUser: selectCurrentUser,
   totalChatCount: selectTotalChatCount
});
export default connect(mapStateToProps)(Myprofile);
