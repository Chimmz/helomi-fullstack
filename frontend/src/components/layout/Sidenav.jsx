import React from 'react';
import SidenavSearch from '../Sidenav-search';
import ChatList from '../ChatList';
import './Sidenav.scss';

function Sidenav() {
   return (
      <div className="allchats">
         <SidenavSearch />
         <ChatList />
      </div>
   );
}
export default Sidenav;
