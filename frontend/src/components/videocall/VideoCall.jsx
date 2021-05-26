import React from 'react';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
   selectIsFullscreen,
   selectIsOnVideoCall,
   selectIsAddingToCall
} from '../../redux/videocall/videocall.selectors';

import { socketContext } from '../../contexts/SocketProvider';
import AddToCallPrompt from './AddToCallPrompt';
import ChatsAndAttendees from './chats-and-attendees/ChatsAndAttendees';
import CallSection from './call-section/Call-section';
import Overlay from '../UI/Overlay';
import './VideoCall.scss';

function VideoCall({ chatId, isOnVideoCall, isAddingToCall, isFullscreen }) {
   return (
      <>
         <div
            className={`videocall-modal ${
               isOnVideoCall && 'videocall-modal--zoomed-into-view'
            } ${isFullscreen && 'videocall-modal--fullscreen'}`}
         >
            <ChatsAndAttendees />
            <CallSection chatId={chatId} />
            {isAddingToCall && <AddToCallPrompt />}
         </div>
         <Overlay showIf={isOnVideoCall} />
      </>
   );
}
const mapStateToProps = createStructuredSelector({
   isOnVideoCall: selectIsOnVideoCall,
   isFullscreen: selectIsFullscreen,
   isAddingToCall: selectIsAddingToCall
});
export default connect(mapStateToProps)(VideoCall);
