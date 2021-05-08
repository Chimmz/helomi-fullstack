import React, { useEffect, useContext } from 'react';
import SidenavSearch from '../Sidenav-search';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/user.selectors';

import { socketContext } from '../../contexts/SocketProvider';
import ChatList from '../ChatList';
import './Sidenav.scss';

function Sidenav({ currentUser }) {
   const { socket } = useContext(socketContext);

   useEffect(() => {
      socket.emit('join-self', currentUser._id);
   }, []);

   return (
      <div className="allchats">
         <SidenavSearch />
         <ChatList />
      </div>
   );
}

const mapStateToProps = createStructuredSelector({
   currentUser: selectCurrentUser
});
export default connect(mapStateToProps)(Sidenav);
