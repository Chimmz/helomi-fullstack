import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectUser, selectCurrentUser } from '../redux/user/user.selectors';

import io from 'socket.io-client';
import Chat from './Chat';
import './ChatList.scss';

// const socket = io.connect('/');

function ChatList({ user, currentUser }) {
   const { friends } = currentUser;
   return (
      <div className="allchats__chatlist remove-bullets">
         {friends.map(f => (
            <Chat key={f.id} chat={f} />
         ))}
      </div>
   );
}

const mapStateToProps = createStructuredSelector({
   user: selectUser,
   currentUser: selectCurrentUser
});
export default connect(mapStateToProps)(ChatList);
