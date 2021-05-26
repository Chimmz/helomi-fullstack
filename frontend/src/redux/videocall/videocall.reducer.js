import * as videocallActions from './videocall.action.types';

const initState = {
   call: {
      caller: null,
      roomId: null,
      offer: null,
      answer: null,
      isMuted: true,
      videoStopped: false
   },
   isRinging: false,
   isOnCall: false,
   isFullscreen: false,
   isAddingNewPeerToCall: false
};

const videocallReducer = function (state = initState, action) {
   const { type, payload } = action;
   switch (type) {
      case videocallActions.RING:
         const { caller, roomId } = payload;
         return {
            ...state,
            call: { ...state.call, caller, roomId },
            isRinging: true
         };
         break;

      case videocallActions.STOP_RINGING:
         return { ...state, isRinging: false };
         break;

      case videocallActions.START_CALL:
         return {
            ...state,
            call: {
               ...state.call,
               caller: payload.caller,
               roomId: payload.roomId
            },
            isOnCall: true
         };

      case videocallActions.SET_RTC_OFFER:
         return {
            ...state,
            call: { ...state.call, offer: payload.offer }
         };

      case videocallActions.SET_RTC_ANSWER:
         return {
            ...state,
            call: { ...state.call, answer: payload.answer }
         };

      case videocallActions.ACCEPT_CALL:
         return { ...state, isOnCall: true };

      case videocallActions.END_CALL:
         return { ...state, isOnCall: false };

      case videocallActions.ZOOM_TO_FULLSCREEN:
         return { ...state, isFullscreen: true };

      case videocallActions.EXIT_FULLSCREEN:
         return { ...state, isFullscreen: false };

      case videocallActions.SET_IS_ADDING_NEW_PEER_TO_CALL:
         return { ...state, isAddingNewPeerToCall: payload.boolVal };

      default:
         return state;
   }
};

export default videocallReducer;
