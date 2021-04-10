import React from 'react';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectUser } from '../redux/user/user.selectors';

import { getMsgSentTime } from '../redux/msg/msg.utils';
import './Textmsg.scss';

function Textmsg({ msg, user: { currentUser } }) {
   const direction = msg.sender === currentUser._id ? 'outgoing' : 'incoming';
   return (
      <div className={`textmsg textmsg--${direction}`}>
         <p className="textmsg__content">{msg.text}</p>
         <p className="textmsg__time">
            {getMsgSentTime(+new Date(msg.createdAt))}
         </p>
      </div>
   );
}

const mapStateToProps = createStructuredSelector({
   user: selectUser
});
export default connect(mapStateToProps)(Textmsg);
