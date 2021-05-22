import { createSelector } from 'reselect';

const videocall = state => state.videocall;

export const selectIsVideoCalling = createSelector(
   [videocall],
   videocall => videocall.isCalling
);
export const selectIsFullscreen = createSelector(
   [videocall],
   videocall => videocall.isFullscreen
);
