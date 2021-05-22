import React, { useContext } from 'react';
import { Redirect, Route, withRouter } from 'react-router-dom';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectUser } from './redux/user/user.selectors';
import { selectAllAlerts } from './redux/alert/alert.selectors';
import { selectIsVideoCalling } from './redux/videocall/videocall.selectors';
import { LOAD_USER } from './redux/user/user.actions.type';
import store from './redux/store';

import { SocketProvider } from './contexts/SocketProvider';

import Navbar from './components/layout/Navbar';
import ChattingSection from './components/layout/Chatting-section';
import Sidenav from './components/layout/Sidenav';
import Signup from './components/pages/Signup';
import Login from './components/pages/Login';
import Alerts from './components/Alerts';
import VideoCall from './components/videocall/VideoCall';
import './App.scss';

// store.dispatch({ type: LOAD_USER });
function ReplaceLater() {
   return <div className="default-img"></div>;
}

function App({ alerts, user, isVideoCalling }) {
   return (
      <SocketProvider>
         <Alerts alerts={alerts} />
         <Navbar />
         <Route exact path="/login" component={Login} />
         <Route exact path="/signup" component={Signup} />
         <Route
            path="/"
            render={() =>
               user.isLoggedIn ? <Sidenav /> : <Redirect to="/login" />
            }
         />
         <Route exact path="/" component={ReplaceLater} />
         <Route
            exact
            path="/chats/:id"
            render={routeProps =>
               user.isLoggedIn ? (
                  <ChattingSection {...routeProps} />
               ) : (
                  <Redirect to="/login" />
               )
            }
         />
         {isVideoCalling && <VideoCall />}
      </SocketProvider>
   );
}

const mapStateToProps = createStructuredSelector({
   alerts: selectAllAlerts,
   user: selectUser,
   isVideoCalling: selectIsVideoCalling
});

export default withRouter(connect(mapStateToProps)(App));
