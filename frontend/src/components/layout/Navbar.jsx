import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import RateReviewIcon from '@material-ui/icons/RateReview';
import PersonIcon from '@material-ui/icons/Person';
import SettingsIcon from '@material-ui/icons/Settings';

import './Navbar.scss';

function Navbar() {
   const navlinks = [
      {
         label: 'Posts',
         icon: (
            <RateReviewIcon
               className="navbar__link__icon"
               style={{ fontSize: '2rem' }}
            />
         )
      },
      {
         label: 'My profile',
         icon: (
            <PersonIcon
               className="navbar__link__icon"
               style={{ fontSize: '2.2rem' }}
            />
         )
      },
      {
         label: 'Settings',
         icon: (
            <SettingsIcon
               className="navbar__link__icon"
               style={{ fontSize: '2rem' }}
            />
         )
      }
   ];
   return (
      <nav className="navbar">
         <Link to="/">
            <img src="img/helomi-logox2.png" alt="" className="navbar__logo" />{' '}
         </Link>

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
