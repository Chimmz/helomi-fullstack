import { createSelector } from 'reselect';

export const selectMsg = state => state.msg;

export const selectAllMsgs = createSelector([selectMsg], msg => msg.messages);

export const selectChatMsgs = chatId => {
   return createSelector([selectMsg], msg => msg.messages[chatId]);
};

// export const selectLastMsg = chatId => {
//    return createSelector(
//       [selectMsg],
//       msg => msg.messages[chatId]?.slice(-1)[0]
//    );
// };

// export const selectUnreadMsgsCount = chatId => {
//    return createSelector([selectMsg], msg =>
//       msg.messages[chatId]?.reduce(
//          (accum, msg) => (!msg.isRead ? accum + 1 : accum + 0),
//          0
//       )
//    );
// };
