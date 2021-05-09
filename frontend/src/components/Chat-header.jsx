import React, { useState } from 'react';
import { withRouter, useParams } from 'react-router-dom';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectUser, selectCurrentUser } from '../redux/user/user.selectors';

import CallIcon from '@material-ui/icons/Call';
import VideocamIcon from '@material-ui/icons/Videocam';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Dropdown from './formUI/Dropdown';
import Overlay from './UI/Overlay';

import './Chat-header.scss';
import './Icon.scss';

// 'user' is not in use for now
function ChatHeader({ user, currentUser: { friends } }) {
   const currentChat = useParams().id;
   const currentChatName = friends.find(f => f._id === currentChat).username;
   const [chatPhotoZoomedIn, setChatPhotoZoomedIn] = useState(false);

   return (
      <div className="chatting-section__header">
         <div className="chatting-section__header__userdetails">
            <div
               className={`chatting-section__header__userphoto chatting-section__header__userphoto--${
                  chatPhotoZoomedIn && 'zoomed-in'
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
            <CallIcon
               className="chatting-section__header__icon"
               style={{ fontSize: '2.2rem' }}
            />
            <VideocamIcon
               className="chatting-section__header__icon"
               style={{ fontSize: '2.2rem' }}
            />
            <div className="chatting-section__header__icon">
               <MoreVertIcon className="" style={{ fontSize: '2.2rem' }} />
               {/* <Dropdown
                  showIf={'a'}
                  listClassName="allchats__search__results remove-bullets"
                  children={[...'a'.repeat(5)]}
               /> */}
            </div>
         </div>
         <Overlay
            showIf={chatPhotoZoomedIn}
            onClick={() => setChatPhotoZoomedIn(false)}
         />
      </div>
   );
}
const mapStateToProps = createStructuredSelector({
   user: selectUser,
   currentUser: selectCurrentUser
});
export default withRouter(connect(mapStateToProps)(ChatHeader));
