import { createSelector } from 'reselect';

const videocall = state => state.videocall;
const actualCall = state => state.videocall.call;

export const selectIsRinging = createSelector(
   [videocall],
   videocall => videocall.isRinging
);

export const selectIsOnVideoCall = createSelector(
   [videocall],
   videocall => videocall.isOnCall
);

export const selectRtcOffer = createSelector([actualCall], call => call.offer);

export const selectRtcAnswer = createSelector(
   [actualCall],
   call => call.answer
);

export const selectCaller = createSelector([actualCall], call => call.caller);

export const selectCallAccepted = createSelector(
   [videocall],
   videocall => videocall.callAccepted
);

export const selectIsFullscreen = createSelector(
   [videocall],
   videocall => videocall.isFullscreen
);

export const selectIsAddingToCall = createSelector(
   [videocall],
   videocall => videocall.isAddingNewPeerToCall
);

export const selectVideoChatRoomId = createSelector(
   [actualCall],
   call => call.roomId
);
