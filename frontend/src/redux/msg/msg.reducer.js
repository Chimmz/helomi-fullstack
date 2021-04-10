import { GET_MSGS } from './msg.action.types';

const initialState = {
   recentMsgs: []
};

const msgReducer = (state = initialState, action) => {
   switch (action.type) {
      case 'SET_RECENT_MSGS':
         return { ...state, recentMsgs: action.payload.msgs };
      default:
         return state;
   }
};
export default msgReducer;
/* <div className="textmsg textmsg--outgoing textmsg--not-sent">
            <p className="textmsg__content">
               Hey bro!! How’ve you been?! I’ve been searching for your number.
               Have you been around?
            </p>
            <p className="textmsg__time">Today, 2:36 PM</p>
            <p className="textmsg__err-msg">This message couldn't send</p>
         </div>
         <div className="textmsg textmsg--incoming">
            <p className="textmsg__content">
               Hey bro!! How’ve you been?! I’ve been searching for your number.
               Have you been around?
            </p>
            <p className="textmsg__time">Today, 2:36 PM</p>
         </div> */
