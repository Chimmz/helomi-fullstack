import React, { useEffect, useContext } from 'react';
import SidenavSearch from '../Sidenav-search';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { selectIsRinging } from '../../redux/videocall/videocall.selectors';

import { socketContext } from '../../contexts/SocketProvider';
import ChatList from '../ChatList';
import './Sidenav.scss';
import IncomingCallNotify from '../IncomingCallNotify';

function Sidenav({ currentUser, isRinging }) {
   const { socket } = useContext(socketContext);

   useEffect(() => {
      socket.emit('join-self', currentUser._id);
   }, []);

   return (
      <div className="allchats">
         <SidenavSearch />
         <ChatList />
         {isRinging && <IncomingCallNotify />}
      </div>
   );
}

const mapStateToProps = createStructuredSelector({
   currentUser: selectCurrentUser,
   isRinging: selectIsRinging
});
export default connect(mapStateToProps)(Sidenav);
