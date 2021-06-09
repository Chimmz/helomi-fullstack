import React, { useState } from 'react';
import { withRouter, useParams } from 'react-router-dom';

import { connect } from 'react-redux';
import { selectUser, selectCurrentUser } from '../redux/user/user.selectors';
import { startVideoCall } from '../redux/videocall/videocall.action.creators';
import { selectChatName } from '../redux/chat/chat.selectors';
import { deleteChat } from '../redux/chat/chat.action.creators';

import { useToggle } from '../hooks/useToggle';
import Dropdown from './formUI/Dropdown';
import Overlay from './UI/Overlay';
import './Chat-header.scss';
import './Icon.scss';

// 'user' is not in use for now
function ChatHeader({ user, currentChatName, currentUser, dispatch }) {
   const currentChat = useParams().id;
   const [chatPhotoZoomedIn, setChatPhotoZoomedIn] = useState(false);
   const [optionsShown, setOptionsShown, toggleOptionsShown] = useToggle(false);

   const handleClickOverlay = () => {
      setChatPhotoZoomedIn(false);
      setOptionsShown(false);
   };

   return (
      <div className="chatting-section__header">
         <div className="chatting-section__header__userdetails">
            <div
               className={`chatting-section__header__userphoto chatting-section__header__userphoto--${
                  chatPhotoZoomedIn ? 'zoomed-in' : 'zoomed-out'
               }`}
            >
               <img
                  // src="https://media.images.yourquote.in/post/large/0/0/13/395/4Vo98140.jpg"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTT9ho0lI0YvJexoiXfCuKSVGaDDq5LanKzAA&usqp=CAU"
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
            {/* <i
               className="fas fa-phone-alt with-label with-label-at-bottom"
               data-label="Start audio call"
            ></i> */}
            <i
               className="fas fa-video with-label with-label-at-bottom"
               data-label="Start video call"
               onClick={() =>
                  dispatch(startVideoCall(currentUser._id, currentChat))
               }
            ></i>
            <div className="chatting-section__header__nav__options">
               <i
                  className="fas fa-ellipsis-v chatting-section__header__nav__options-icon"
                  onClick={toggleOptionsShown}
               ></i>
               <Dropdown
                  className="chatting-section__header__nav__options__dropdown"
                  showIf={optionsShown}
                  children={
                     <li
                        className="chatting-section__header__nav__options__item"
                        onClick={() =>
                           dispatch(deleteChat(user.token, currentChat))
                        }
                     >
                        Delete friend
                     </li>
                  }
               />
            </div>
         </div>
         <Overlay
            showIf={chatPhotoZoomedIn || optionsShown}
            onClick={handleClickOverlay}
            transparent={optionsShown}
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
