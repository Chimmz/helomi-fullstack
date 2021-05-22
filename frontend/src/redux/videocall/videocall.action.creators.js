import * as videoCallActions from './videocall.action.types';

export const startVideoCall = () => ({ type: videoCallActions.START_CALL });
export const endVideoCall = () => ({ type: videoCallActions.END_CALL });
export const zoomToFullscreen = () => ({
   type: videoCallActions.ZOOM_TO_FULLSCREEN
});
export const exitFullscreen = () => ({
   type: videoCallActions.EXIT_FULLSCREEN
});
