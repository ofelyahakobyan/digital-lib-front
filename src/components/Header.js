import React from 'react';
import logo from '../assets/icons/logo.svg';
import NavBar from './NavBar';
import searchIcon from '../assets/icons/search.svg';
import basketIcon from '../assets/icons/basket.svg';
import wishListIcon from '../assets/icons/wishlist.svg';
import loginIcon from '../assets/icons/login.svg';

function Header() {
  return (
    <div className="header">
      <div className="general">
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>
        <NavBar />
        <div className="functional">
          <img src={searchIcon} alt="searchIcon" className="search" />
          <img src={basketIcon} alt="basketIcon" className="basket" />
          <img src={wishListIcon} alt="wishListIcon" className="wish" />
          <img src={loginIcon} alt="loginIcon" className="login" />
        </div>
      </div>
    </div>

  );
}

export default Header;
