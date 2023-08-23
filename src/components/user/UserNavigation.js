import React from 'react';
import { NavLink } from 'react-router-dom';
import profileImg from '../../assets/profile_icons/profile.svg';
import booksImg from '../../assets/profile_icons/books.svg';
import goalsImg from '../../assets/profile_icons/goals.svg';
import productivityImg from '../../assets/profile_icons/productivity.svg';
import starImg from '../../assets/profile_icons/star.svg';
import walletImg from '../../assets/profile_icons/wallet.svg';
import logout from '../../assets/profile_icons/logout.svg';

function UserNavigation() {
  return (
    <div className="user-navigation">
      <NavLink to="/user-profile">
        <div className="user-nav">
          <img src={profileImg} alt="profile" />
          <span> Personal information </span>
        </div>
      </NavLink>
      <NavLink to="/user-books">
        <div className="user-nav">
          <img src={booksImg} alt="book" />
          <span>My Books</span>
        </div>
      </NavLink>
      <NavLink to="/user-payment-method">
        <div className="user-nav">
          <img src={walletImg} alt="wallet" />
          <span> Payment method</span>
        </div>
      </NavLink>
      <NavLink to="/user-reviews">
        <div className="user-nav">
          <img src={starImg} alt="review" />
          <span>Reviews and ratings</span>
        </div>
      </NavLink>
      <NavLink to="/user-productivity">
        <div className="user-nav">
          <img src={productivityImg} alt="productivity" />
          <span>Productivity tracker</span>
        </div>
      </NavLink>
      <NavLink to="/user-goals">
        <div className="user-nav">
          <img src={goalsImg} alt="goals" />
          <span>Goals setting</span>
        </div>
      </NavLink>
      <div className="user-nav" style={{ marginTop: 100 }}>
        <img src={logout} alt="log-out" />
        <span> Log out </span>
      </div>
    </div>
  );
}

export default UserNavigation;
