/* eslint-disable no-useless-constructor */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { Redirect, Route, withRouter } from 'react-router-dom';

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

export var socket;

function ReplaceLater() {
   return <div className="default-img"></div>;
}

// store.dispatch({ type: LOAD_USER });

class App extends Component {
   constructor(props) {
      super(props);
   }
   componentDidMount() {
      const { user, history } = this.props;
      console.log(user);
      if (!user.isLoggedIn) history.push('/login');

      socket = io.connect('/');
      socket.on('test-event', () => alert('Hey bro'));
   }
   componentWillMount() {
      // socket.emit('disconnect');
   }
   render() {
      const { alerts, user } = this.props;
      console.log('From App.jx', user);
      return (
         <>
            <Alerts alerts={alerts} />
            <Navbar />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />

            <Route path="/" component={user.isLoggedIn ? Sidenav : Login} />
            <Route exact path="/" component={ReplaceLater} />
            {/* prettier-ignore */}
            <Route exact path="/chats/:id" component={user.isLoggedIn ? ChattingSection : Login} />
         </>
      );
   }
}
const mapStateToProps = createStructuredSelector({
   alerts: selectAllAlerts,
   user: selectUser
});
const mapDispatchToProps = dispatch => ({});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
