import React, { useCallback, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import profileImg from '../../assets/icons/profile.svg';
import booksImg from '../../assets/icons/books.svg';
import starImg from '../../assets/icons/star.svg';
import walletImg from '../../assets/icons/wallet.svg';
import logout from '../../assets/icons/logout.svg';
import classes from './profile.module.css';

function UserNavigation() {
  const [token, setToken] = useState(`${localStorage.getItem('token')}`);
  const profile = useSelector((state) => state.users.profile);
  const navigate = useNavigate();
  const handleClick = useCallback(() => {
    setToken(localStorage.removeItem('token'));
    navigate('/login');
    window.location.reload();
  }, [token]);
  return (
    <div className={`${classes.user_navigation}`}>
      <h1 className={`${classes.title}`}>
        {profile.firstName}
        {' '}
        {profile.lastName}
      </h1>
      <NavLink to={`/user/${profile.id}`}>
        <div className={`${classes.user_nav}`}>
          <img className={`${classes.img}`} src={profileImg} alt="profile" />
          <span className={`${classes.span}`}> Personal information </span>
        </div>
      </NavLink>
      <NavLink to="/user-books">
        <div className={`${classes.user_nav}`}>
          <img className={`${classes.img}`} src={booksImg} alt="book" />
          <span className={`${classes.span}`}>My Books</span>
        </div>
      </NavLink>
      <NavLink to="/user-payment-method">
        <div className={`${classes.user_nav}`}>
          <img className={`${classes.img}`} src={walletImg} alt="wallet" />
          <span className={`${classes.span}`}> Payment method</span>
        </div>
      </NavLink>
      <NavLink to={`/user/${profile.id}/reviews`}>
        <div className={`${classes.user_nav}`}>
          <img className={`${classes.img}`} src={starImg} alt="review" />
          <span className={`${classes.span}`}>Reviews and ratings</span>
        </div>
      </NavLink>
      <div className={`${classes.user_nav}`} style={{ marginTop: 50 }}>
        <button type="button" className={`${classes.button}`} onClick={handleClick}>
          <img className={`${classes.img}`} src={logout} alt="log-out" />
          <span className={`${classes.span}`}> Log out </span>
        </button>
      </div>
    </div>
  );
}

export default UserNavigation;
