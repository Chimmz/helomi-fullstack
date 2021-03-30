import React from 'react';
import './Navbar.scss';

function Navbar() {
   return (
      <nav class="navbar">
         <img src="img/helomi-logox2.png" alt="" class="navbar__logo" />
         <ul class="navbar__links remove-bullets">
            <li class="navbar__link navbar__link--active">
               <i class="fas fa-mail-bulk navbar__link__icon"></i>
               <span class="navbar__link__label">Posts</span>
            </li>
            <li class="navbar__link">
               <i class="fas fa-user-alt navbar__link__icon"></i>
               <span class="navbar__link__label">My profile</span>
            </li>
            <li class="navbar__link">
               <i class="fas fa-cog navbar__link__icon"></i>
               <span class="navbar__link__label">Settings</span>
            </li>
         </ul>
      </nav>
   );
}
export default Navbar;
