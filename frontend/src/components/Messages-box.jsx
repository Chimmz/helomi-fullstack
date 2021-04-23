import React, { useEffect, useState } from 'react';
import { useParams, withRouter } from 'react-router-dom';
import ReactScrollableFeed from 'react-scrollable-feed';
// import ScrollToBottom from 'react-scroll-to-bottom';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectChatMsgs } from '../redux/msg/msg.selectors';
import { loadChatMsgs } from '../redux/msg/msg.actions.creators';
import { selectUser } from '../redux/user/user.selectors';

import Textmsg from './Textmsg';
import './Messages-box.scss';

function MessagesBox({ allMsgs, loadChatMsgs, user }) {
   const chatId = useParams().id;

   useEffect(() => {
      // alert('Mounted');
      loadChatMsgs(user.token, chatId);
   }, []);
   useEffect(() => {
      console.log('allMsgs', allMsgs);
   }, [allMsgs?.length]);

   return (
      <ReactScrollableFeed>
         <div className="chatting-section__messages-box">
            {allMsgs?.map(msg => (
               <Textmsg key={msg._id} msg={msg} />
            ))}
         </div>
      </ReactScrollableFeed>
   );
}
const mapStateToProps = (state, ownProps) => ({
   user: selectUser(state),
   allMsgs: selectChatMsgs(ownProps.match.params.id)(state)
});

export default withRouter(
   connect(mapStateToProps, {
      loadChatMsgs: (token, chatId) => loadChatMsgs(token, chatId)
   })(MessagesBox)
);
