import { ADD_MSG, GET_MSGS } from './msg.action.types';

export const getAllMsgs = () => {
   return {
      type: GET_MSGS
   };
};
