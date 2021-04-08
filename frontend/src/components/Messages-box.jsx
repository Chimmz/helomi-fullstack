import React from 'react';
import { connect } from 'react-redux';

import Textmsg from './Textmsg';
import './Messages-box.scss';

function MessagesBox({ messages }) {
   return (
      <div className="chatting-section__messages-box">
         {messages.map(msg => (
            <Textmsg key={msg + Math.random()} msg={msg} />
         ))}
      </div>
   );
}
const mapStateToProps = state => ({
   messages: state.msg.messages
});

export default connect(mapStateToProps)(MessagesBox);
