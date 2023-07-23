import React from 'react';
import { NavLink } from 'react-router-dom';

function NavBar() {
  return (
    <div className="menu">
      <NavLink to="/home">Home</NavLink>
      <NavLink to="/catalog">Catalog</NavLink>
      <NavLink to="/new">New</NavLink>
      <NavLink to="/popular">Popular</NavLink>
      <NavLink to="/bestseller">Bestseller</NavLink>
      <NavLink to="/contact_us">Contact us</NavLink>
    </div>
  );
}

export default NavBar;
