import React from 'react';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectChatMsgs } from '../../redux/msg/msg.selectors';

import LoadingSpinner from '../UI/Loader';
import ChatFooter from '../Chat-footer';
import ChatHeader from '../Chat-header';
import MessagesBox from '../Messages-box';
import './Chatting-section.scss';

function ChattingSection({ allMsgs, isLoaded }) {
   // console.log('From chatting-sec, allMsgs = ', allMsgs, 'params', '');
   return (
      <div className="chatting-section">
         <ChatHeader />
         <MessagesBox />
         <ChatFooter />
         {!isLoaded && <LoadingSpinner size="lg" msg="loading messages..." />}
      </div>
   );
}
const mapStateToProps = (state, ownProps) => ({
   allMsgs: selectChatMsgs(ownProps.match.params.id)(state),
   isLoaded: state.msg.isLoaded
});
export default connect(mapStateToProps)(ChattingSection);
