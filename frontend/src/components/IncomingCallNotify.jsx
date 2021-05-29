import React, { useContext } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { socketContext } from '../contexts/SocketProvider';
import { acceptCall } from '../redux/videocall/videocall.action.creators';
import {
   ACCEPT_CALL,
   STOP_RINGING
} from '../redux/videocall/videocall.action.types';
import {
   selectRtcOffer,
   selectCaller,
   selectVideoChatRoomId
} from '../redux/videocall/videocall.selectors';

import './IncomingCallNotify.scss';

function IncomingCallNotify({ caller, rtcOffer, videocallRoomId, dispatch }) {
   console.log(caller);
   const handleAccept = () => {
      dispatch({ type: STOP_RINGING });
      dispatch({ type: ACCEPT_CALL });
   };

   return (
      <div className="callnotify">
         <i className="fas fa-phone-volume callnotify__icon"></i>
         <h1 className="callnotify__msg">Someone is calling</h1>
         <div className="callnotify__user-actions">
            <button
               className="btn btn-md callnotify__user-action btn-red"
               onClick={() => dispatch({ type: STOP_RINGING })}
            >
               Decline
            </button>
            <button
               className="btn btn-md callnotify__user-action btn-green"
               onClick={handleAccept}
            >
               Accept
            </button>
         </div>
      </div>
   );
}

const mapStateToProps = createStructuredSelector({
   rtcOffer: selectRtcOffer,
   caller: selectCaller,
   videocallRoomId: selectVideoChatRoomId
});

export default connect(mapStateToProps)(IncomingCallNotify);
