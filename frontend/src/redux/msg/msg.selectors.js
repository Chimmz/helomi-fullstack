import { createSelector } from 'reselect';

export const selectMsg = state => state.msg;
export const selectRecentMsgs = createSelector(
   [selectMsg],
   msg => msg.recentMsgs
);
