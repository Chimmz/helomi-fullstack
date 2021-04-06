import React from 'react';
import { Route, withRouter } from 'react-router-dom';

import store from './redux/store';

import Navbar from './components/layout/Navbar';
import ChattingSection from './components/layout/Chatting-section';
import Sidenav from './components/layout/Sidenav';
import Signup from './components/pages/Signup';
import Login from './components/pages/Login';
import './App.scss';

function ReplaceLater() {
   return (
      <div style={{ width: '100%', height: '100%', background: 'gray' }}></div>
   );
}

function App(props) {
   // console.log(props);
   return (
      <>
         <Navbar />
         <Route exact path="/login" component={Login} />
         <Route exact path="/signup" component={Signup} />

         <Route exact path="/chat" component={Sidenav} />
         {/* <Route exact path="/chat" component={ReplaceLater} /> */}
         <Route exact path="/chat/:id" component={ChattingSection} />
      </>
   );
}

export default withRouter(App);
