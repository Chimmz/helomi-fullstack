import React from 'react';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectUser } from '../../redux/user/user.selectors';

import ChatFooter from '../Chat-footer';
import ChatHeader from '../Chat-header';
import MessagesBox from '../Messages-box';
import './Chatting-section.scss';

function ChattingSection({ user }) {
   console.log('From chatting-sec, user = ', user);
   return (
      <div className="chatting-section">
         <ChatHeader />
         <MessagesBox />
         <ChatFooter />
      </div>
   );
}
const mapStateToProps = createStructuredSelector({ user: selectUser });
export default connect(mapStateToProps)(ChattingSection);
