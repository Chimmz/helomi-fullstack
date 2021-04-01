import React from 'react';
import { Route } from 'react-router-dom';

import store from './redux/store';
import { getAllMsgs } from './redux/msg/msg.actions.creators';

import Navbar from './components/layout/Navbar';
import ChattingSection from './components/layout/Chatting-section';
import Sidenav from './components/layout/Sidenav';
import './App.scss';

function App() {
   return (
      <>
         <Navbar />
         <Sidenav />
         <Route exact path="/chat/:id" component={ChattingSection} />
      </>
   );
}

export default App;
