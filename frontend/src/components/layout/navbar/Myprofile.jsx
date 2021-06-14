import React, { useState } from 'react';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../../redux/user/user.selectors';
import { LOGOUT_USER } from '../../../redux/user/user.actions.type';

import { useToggle } from '../../../hooks/useToggle';
import './Myprofile.scss';
import { selectTotalChatCount } from '../../../redux/chat/chat.selectors';
import { logOutUser } from '../../../redux/user/user.actions.creators';

const Myprofile = function ({ currentUser, totalChatCount, logOutUser }) {
   const [showFullProfile, _, toggleShowFullProfile] = useToggle(false);

   return (
      <div className="navbar__myprofile">
         <div className="navbar__loggedin-user" onClick={toggleShowFullProfile}>
            <img
               src="https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"
               alt=""
               className="navbar__photo pic pic--xsm"
            />
            <span className="navbar__username">{currentUser.username}</span>
         </div>

         <div
            className={`navbar__myprofile__dropdown ${
               showFullProfile && 'navbar__myprofile__dropdown--slide-into-view'
            }`}
         >
            <div className="navbar__myprofile__dropdown__picture">
               <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTT9ho0lI0YvJexoiXfCuKSVGaDDq5LanKzAA&usqp=CAU"
                  alt=""
                  className="navbar__myprofile__dropdown__photo pic pic--lg"
               />
               <span className="changephoto">
                  <i className="fas fa-camera"></i>
                  Change photo
               </span>
            </div>
            <div className="navbar__myprofile__dropdown__user-details">
               <span className="navbar__myprofile__dropdown__username">
                  {currentUser.username}
               </span>
               <span className="navbar__myprofile__dropdown__email">
                  {currentUser.email}
               </span>
               <span className="navbar__myprofile__dropdown__friendscount">
                  {totalChatCount}{' '}
                  {`${totalChatCount === 1 ? 'friend' : 'friends'}`}
               </span>
               {/* <span className="navbar__myprofile__dropdown__datejoined">
                  Joined Mar. 24
               </span> */}
            </div>

            <button
               className="btn btn-md btn-primary logout"
               onClick={logOutUser}
            >
               Log out
            </button>
         </div>
      </div>
   );
};

const mapStateToProps = createStructuredSelector({
   currentUser: selectCurrentUser,
   totalChatCount: selectTotalChatCount
});

const mapDispatchToProps = dispatch => ({
   logOutUser: () => dispatch(logOutUser())
});
export default connect(mapStateToProps, mapDispatchToProps)(Myprofile);
