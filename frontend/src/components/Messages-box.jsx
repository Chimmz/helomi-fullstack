import React, { useEffect, useState } from 'react';
import { useParams, withRouter } from 'react-router-dom';
// import ScrollToBottom from 'react-scroll-to-bottom';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectRecentMsgs } from '../redux/msg/msg.selectors';
import { loadChatMsgs } from '../redux/msg/msg.actions.creators';
import { selectUser } from '../redux/user/user.selectors';

import Textmsg from './Textmsg';
import './Messages-box.scss';

function MessagesBox({ user, messages, loadMsgs }) {
   const chatId = useParams().id;
   const [msgs, setMsgs] = useState(messages);

   async function getMsgs() {
      try {
         const response = await fetch(
            `http://localhost:5000/users/friends/${chatId}/msgs`,
            {
               method: 'GET',
               headers: { Authorization: `Bearer ${user.token}` }
            }
         );
         const { msgs } = await response.json();
         setMsgs(msgs);
      } catch (err) {
         console.log(err);
      }
   }
   useEffect(() => {
      getMsgs();
   }, [chatId]);

   messages = messages?.map(msg => ({ ...msg, isRead: true }));
   return (
      <div className="chatting-section__messages-box">
         {msgs.map(msg => (
            <Textmsg key={msg._id} msg={msg} />
         ))}
      </div>
   );
}
const mapStateToProps = createStructuredSelector({
   messages: selectRecentMsgs,
   user: selectUser
});

export default withRouter(
   connect(mapStateToProps, { loadMsgs: loadChatMsgs })(MessagesBox)
);
