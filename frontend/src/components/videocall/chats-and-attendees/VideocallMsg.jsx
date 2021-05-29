import React from 'react';
import './VideocallMsg.scss';
import '../../Textmsg.scss';

function VideocallMsg() {
   return (
      <>
         <div className="videocall-msg textmsg--incoming">
            <img
               src="img/faces3.jpg"
               alt=""
               className="videocall-msg__sender-photo pic pic--xsm"
            />
            <div className="videocall-msg__sender-name">Mary Smith</div>
            <p className="videocall-msg__content">
               Hello all. We're all welcome to this conference call. Hello all.
               We're all welcome to this conference call
            </p>
         </div>
         {/* <div className="videocall-msg textmsg--outgoing">
            <img
               src="img/faces3.jpg"
               alt=""
               className="videocall-msg__sender-photo pic pic--xsm"
            />
            <div className="videocall-msg__sender-name">Mary Smith</div>
            <p className="videocall-msg__content">
               Hello all. We're all welcome to this conference call. Hello all.
               We're all welcome to this conference call
            </p>
         </div> */}
      </>
   );
}

export default VideocallMsg;
