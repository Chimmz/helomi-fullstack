import React from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { selectIsLoadingChatMsgs } from '../../redux/chat/chat.selectors';
import { selectIsOnVideoCall } from '../../redux/videocall/videocall.selectors';

import LoadingSpinner from '../UI/Loader';
import ChatFooter from '../Chat-footer';
import ChatHeader from '../Chat-header';
import MessagesBox from '../Messages-box';
import VideoCall from '../videocall/VideoCall';
import './Chatting-section.scss';

function ChattingSection({ isLoadingMsgs, isOnVideoCall }) {
   const chatId = useParams().id;

   return (
      <div className="chatting-section">
         <ChatHeader />
         <MessagesBox />
         <ChatFooter />
         {isLoadingMsgs && (
            <LoadingSpinner size="lg" msg="loading messages..." />
         )}
         {isOnVideoCall && <VideoCall chatId={chatId} />}
      </div>
   );
}
const mapStateToProps = (state, ownProps) => ({
   isLoadingMsgs: selectIsLoadingChatMsgs(ownProps.match.params.id)(state),
   isOnVideoCall: selectIsOnVideoCall(state)
});
export default connect(mapStateToProps)(ChattingSection);
