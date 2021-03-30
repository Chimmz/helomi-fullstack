import React from 'react';
import '../sass/textfield.scss';
import './Sidenav-search.scss';

function SidenavSearch() {
   return (
      <div class="search-section">
         <div class="allchats__search">
            <input
               type="text"
               class="textfield allchats__search-field"
               placeholder="Search chats"
            />
            <i class="fas fa-search allchats__search-icon"></i>
         </div>
      </div>
   );
}
export default SidenavSearch;
