import React from 'react';
import ChattingSection from './Chatting-section';
import Sidenav from './Sidenav';

function AppBody() {
   return (
      <main class="app-body">
         <Sidenav />
         <ChattingSection />
      </main>
   );
}

export default AppBody;
