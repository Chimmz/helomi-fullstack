import React, { useState, useContext, createContext } from 'react';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectVideoChatRoomId } from '../redux/videocall/videocall.selectors';

export const videoCallContext = createContext();

export const VideoCallProvider = props => {
   const [videoCallSession, setVideoCallSession] = useState({
      roomId: null,
      caller: null,
      offer: null,
      answer: null,
      msgs: []
   });
   return (
      <videoCallContext.Provider
         value={{ session: videoCallSession, setSession: setVideoCallSession }}
      >
         {props.children}
      </videoCallContext.Provider>
   );
};
