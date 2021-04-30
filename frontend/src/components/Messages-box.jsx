import React, { useEffect } from 'react';
import { useParams, withRouter } from 'react-router-dom';
import ReactScrollableFeed from 'react-scrollable-feed';

import { connect } from 'react-redux';
import { loadChatMsgs } from '../redux/msg/msg.actions.creators';
import { selectChatMsgs } from '../redux/msg/msg.selectors';
import { selectUser } from '../redux/user/user.selectors';
import { selectIsLoadingChatMsgs } from '../redux/chat/chat.selectors';

import Textmsg from './Textmsg';
import './Messages-box.scss';

function MessagesBox({ allMsgs, isLoadingChatMsgs, loadChatMsgs, user }) {
   const chatId = useParams().id;

   useEffect(() => {
      isLoadingChatMsgs && loadChatMsgs(user.token, chatId);
   }, [chatId]);

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
   allMsgs: selectChatMsgs(ownProps.match.params.id)(state),
   isLoadingChatMsgs: selectIsLoadingChatMsgs(ownProps.match.params.id)(state)
});

export default withRouter(
   connect(mapStateToProps, {
      loadChatMsgs: (token, chatId) => loadChatMsgs(token, chatId)
   })(React.memo(MessagesBox))
);
