import React from 'react';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
   selectIsFullscreen,
   selectIsVideoCalling
} from '../../redux/videocall/videocall.selectors';

import AddToCallPrompt from './AddToCallPrompt';
import ChatsAndAttendees from './chats-and-attendees/ChatsAndAttendees';
import CallSection from './call-section/Call-section';
import Overlay from '../UI/Overlay';
import './VideoCall.scss';

function VideoCall({ isVideoCalling, isFullscreen }) {
   return (
      <>
         <div
            className={`videocall-modal ${
               isVideoCalling && 'videocall-modal--zoomed-into-view'
            } ${isFullscreen && 'videocall-modal--fullscreen'}`}
         >
            <ChatsAndAttendees />
            <CallSection />
            {/* <AddToCallPrompt /> */}
         </div>
         <Overlay showIf={isVideoCalling} />
      </>
   );
}
const mapStateToProps = createStructuredSelector({
   isVideoCalling: selectIsVideoCalling,
   isFullscreen: selectIsFullscreen
});
export default connect(mapStateToProps)(VideoCall);
