import React from 'react';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectChats } from '../redux/chat/chat.selectors';

import Chat from './Chat';
import LoadingSpinner from './UI/Loader';
import './ChatList.scss';

function ChatList({ chats }) {
   return chats.length ? (
      <div className="allchats__chatlist">
         {chats.map(ch => <Chat key={ch.id} chat={ch} />)}
      </div>
   ) : (
      <LoadingSpinner />
   );
}

const mapStateToProps = createStructuredSelector({ chats: selectChats });
export default connect(mapStateToProps)(ChatList);
