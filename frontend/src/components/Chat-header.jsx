import React, { useState } from 'react';
import { withRouter, useParams } from 'react-router-dom';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectUser, selectCurrentUser } from '../redux/user/user.selectors';
import { startVideoCall } from '../redux/videocall/videocall.action.creators';

import Dropdown from './formUI/Dropdown';
import Overlay from './UI/Overlay';
import './Chat-header.scss';
import './Icon.scss';
import { selectChatName } from '../redux/chat/chat.selectors';

// 'user' is not in use for now
function ChatHeader({ user, currentChatName, currentUser, dispatch }) {
   const currentChat = useParams().id;
   const [chatPhotoZoomedIn, setChatPhotoZoomedIn] = useState(false);

   return (
      <div className="chatting-section__header">
         <div className="chatting-section__header__userdetails">
            <div
               className={`chatting-section__header__userphoto chatting-section__header__userphoto--${
                  chatPhotoZoomedIn ? 'zoomed-in' : 'zoomed-out'
               }`}
            >
               <img
                  src="https://media.images.yourquote.in/post/large/0/0/13/395/4Vo98140.jpg"
                  alt=""
                  className="user-img pic pic--sm"
                  onClick={() => setChatPhotoZoomedIn(true)}
               />
            </div>
            <span className="chatting-section__header__username">
               {currentChatName}
            </span>
         </div>
         <div className="chatting-section__header__nav">
            <i
               className="fas fa-phone-alt with-label with-label-at-bottom"
               data-label="Start audio call"
            ></i>
            <i
               className="fas fa-video with-label with-label-at-bottom"
               data-label="Start video call"
               onClick={() =>
                  dispatch(startVideoCall(currentUser._id, currentChat))
               }
            ></i>
            <i className="fas fa-ellipsis-v"></i>
         </div>
         <Overlay
            showIf={chatPhotoZoomedIn}
            onClick={() => setChatPhotoZoomedIn(false)}
         />
      </div>
   );
}
const mapStateToProps = (state, ownProps) => ({
   user: selectUser(state),
   currentUser: selectCurrentUser(state),
   currentChatName: selectChatName(ownProps.match.params.id)(state)
});
export default withRouter(connect(mapStateToProps)(ChatHeader));
