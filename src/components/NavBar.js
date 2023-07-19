import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../assets/icons/logo.svg';
import basketIcon from '../assets/icons/basket.svg';
import searchIcon from '../assets/icons/search.svg';
import wishListIcon from '../assets/icons/wishlist.svg';
import loginIcon from '../assets/icons/login.svg';

function NavBar() {
  return (
    <div className="navBar_general">
      <div className="navBar">
        <div className="navBar_logo">
          <img src={logo} alt="logo" />
        </div>
        <div className="navBar_menu">
          <NavLink to="/home">Home</NavLink>
          <NavLink to="/catalog">Catalog</NavLink>
          <NavLink to="/new">New</NavLink>
          <NavLink to="/popular">Popular</NavLink>
          <NavLink to="/bestseller">Bestseller</NavLink>
          <NavLink to="/new">Contact us</NavLink>
        </div>
        <div className="navBar_icons">
          <img src={searchIcon} alt="searchIcon" className="navBar_search" />
          <img src={basketIcon} alt="basketIcon" className="navBar_basket" />
          <img src={wishListIcon} alt="wishListIcon" className="navBar_wish" />
          <img src={loginIcon} alt="loginIcon" className="navBar_login" />
        </div>
      </div>
    </div>
  );
}

export default NavBar;
