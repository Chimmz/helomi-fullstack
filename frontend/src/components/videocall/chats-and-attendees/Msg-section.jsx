import React from 'react';
import ReactScrollableFeed from 'react-scrollable-feed';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectVideoChatMsgs } from '../../../redux/videocall/videocall.selectors';

import { v4 as uuidv4 } from 'uuid';
import VideocallMsg from './VideocallMsg';
import NewMsgForm from './NewMsgForm';
import './Msg-section.scss';

function MsgSection({ videoChatMsgs }) {
   console.log('videoChatMsgs', videoChatMsgs);
   return (
      <div className="videocall__chats">
         <ReactScrollableFeed>
            {videoChatMsgs.map(msg => (
               <VideocallMsg key={uuidv4()} msg={msg} />
            ))}
         </ReactScrollableFeed>

         <NewMsgForm />
      </div>
   );
}
const mapStateToProps = createStructuredSelector({
   videoChatMsgs: selectVideoChatMsgs
});
export default connect(mapStateToProps)(MsgSection);
