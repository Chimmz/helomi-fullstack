import React from 'react';
import './ChatsAndAttendeesNav.scss';

function ChatsAndAttendeesNav(props) {
   const { isViewingAttendees, setIsViewingAttendees } = props;

   return (
      <div className="videocall__chats-and-attendees-nav">
         <span
            className={`chats ${!isViewingAttendees && 'nav-item--active'}`}
            data-nav-item="chat-msgs"
            onClick={() => setIsViewingAttendees(false)}
         >
            <i className="fas fa-comments"></i>
         </span>
         <div
            className={`attendees ${isViewingAttendees && 'nav-item--active'}`}
            data-nav-item="attendees"
            onClick={() => setIsViewingAttendees(true)}
         >
            <span className="total">15</span>
            <i className="fas fa-users"></i>
         </div>
      </div>
   );
}

export default ChatsAndAttendeesNav;
