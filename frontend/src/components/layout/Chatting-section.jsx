import React from 'react';
import { connect } from 'react-redux';
import { selectIsLoadingChatMsgs } from '../../redux/chat/chat.selectors';

import LoadingSpinner from '../UI/Loader';
import ChatFooter from '../Chat-footer';
import ChatHeader from '../Chat-header';
import MessagesBox from '../Messages-box';
import './Chatting-section.scss';

function ChattingSection({ isLoadingMsgs }) {
   return (
      <div className="chatting-section">
         <ChatHeader />
         <MessagesBox />
         <ChatFooter />
         {isLoadingMsgs && (
            <LoadingSpinner size="lg" msg="loading messages..." />
         )}
      </div>
   );
}
const mapStateToProps = (state, ownProps) => ({
   isLoadingMsgs: selectIsLoadingChatMsgs(ownProps.match.params.id)(state)
});
export default connect(mapStateToProps)(ChattingSection);
