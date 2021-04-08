/* eslint-disable no-unused-vars */
import React, { useContext, useEffect } from 'react';
import { Route, withRouter } from 'react-router-dom';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectUser } from './redux/user/user.selectors';
import { selectAllAlerts } from './redux/alert/alert.selectors';
import { LOAD_USER } from './redux/user/user.actions.type';
// import {} from './redux/user/user.actions.creators';
import store from './redux/store';

import Navbar from './components/layout/Navbar';
import ChattingSection from './components/layout/Chatting-section';
import Sidenav from './components/layout/Sidenav';
import Signup from './components/pages/Signup';
import Login from './components/pages/Login';
import Alerts from './components/Alerts';
import './App.scss';
import io from 'socket.io-client';

function ReplaceLater() {
   return <div className="default-img"></div>;
}

store.dispatch({ type: LOAD_USER });

function App({ alerts, user }) {
   useEffect(() => {
      const socket = io('http://localhost:5000');
   }, []);
   return (
      <>
         <Alerts alerts={alerts} />
         <Navbar />
         <Route exact path="/login" component={Login} />
         <Route exact path="/signup" component={Signup} />

         <Route path="/" component={Sidenav} />
         <Route exact path="/" component={ReplaceLater} />
         <Route exact path="/chat/:id" component={ChattingSection} />
      </>
   );
}
const mapStateToProps = createStructuredSelector({
   alerts: selectAllAlerts,
   user: selectUser
});
const mapDispatchToProps = dispatch => ({});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
