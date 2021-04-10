import React from 'react';
import { Redirect } from 'react-router';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectUser } from '../redux/user/user.selectors';

import Chat from './Chat';
import './ChatList.scss';

function ChatList({ user }) {
   // console.log('from chatlist', user);
   //prettier-ignore
   const { currentUser: {friends}, isLoggedIn } = user;
   console.log('isLoggedIn', isLoggedIn);

   return !isLoggedIn ? (
      <Redirect to="/login" />
   ) : (
      <div className="allchats__chatlist remove-bullets">
         {friends.map(f => (
            <Chat key={f.id} chat={f} />
         ))}
      </div>
   );
}
const mapStateToProps = createStructuredSelector({
   user: selectUser
});
export default connect(mapStateToProps)(ChatList);
