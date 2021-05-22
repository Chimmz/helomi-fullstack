import * as videoCallActions from './videocall.action.types';

const initState = {
   isCalling: false,
   isMuted: false,
   isFullscreen: false
};

const videocallReducer = function (state = initState, action) {
   switch (action.type) {
      case videoCallActions.START_CALL:
         return { ...state, isCalling: true };

      case videoCallActions.END_CALL:
         return { ...state, isCalling: false };

      case videoCallActions.ZOOM_TO_FULLSCREEN:
         return { ...state, isFullscreen: true };

      case videoCallActions.EXIT_FULLSCREEN:
         return { ...state, isFullscreen: false };

      default:
         return state;
   }
};

export default videocallReducer;
