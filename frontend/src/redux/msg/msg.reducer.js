import { GET_MSGS } from './msg.action.types';

const initialState = {
   messages: [
      {
         text: 'Hello bro. I greet you oo',
         time: '2:32PM',
         direction: 'outgoing'
      },
      {
         text:
            'Hello bro. I greet you oo. Hello bro. I greet you oo. Hello bro. I greet you oo. Hello bro. I greet you oo  you oo. Hello',
         time: '2:32PM',
         direction: 'incoming'
      },
      {
         text: 'Hello bro. I greet you oo',
         time: '2:32PM',
         direction: 'outgoing'
      },
      {
         text: 'Hello bro. I greet you oo',
         time: '2:32PM',
         direction: 'outgoing'
      },
      {
         text: 'Hello bro. I greet you oo',
         time: '2:32PM',
         direction: 'incoming'
      }
   ]
};

export default (state = initialState, action) => {
   switch (action.type) {
      default:
         return state;
   }
};
{
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
}
