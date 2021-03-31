import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.scss';

function Navbar() {
   const navlinks = [
      {
         label: 'Posts',
         icon: <i className="fas fa-mail-bulk navbar__link__icon"></i>
      },
      {
         label: 'My profile',
         icon: <i className="fas fa-user-alt navbar__link__icon"></i>
      },
      {
         label: 'Settings',
         icon: <i className="fas fa-cog navbar__link__icon"></i>
      }
   ];
   return (
      <nav className="navbar">
         <img src="img/helomi-logox2.png" alt="" className="navbar__logo" />

         <div className="navbar__links remove-bullets">
            {navlinks.map(({ label, icon }) => (
               <NavLink
                  key={label}
                  to={`/${label.toLowerCase().split(' ').join('-')}`}
                  className="navbar__link"
                  activeClassName="navbar__link--active"
               >
                  {icon}
                  <span className="navbar__link__label">{label}</span>
               </NavLink>
            ))}
         </div>
      </nav>
   );
}
export default Navbar;
