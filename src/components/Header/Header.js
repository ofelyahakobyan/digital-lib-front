import React, { useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import logo from '../../assets/icons/logo.svg';
import basketIcon from '../../assets/icons/basket.svg';
import wishListIcon from '../../assets/icons/wishlist.svg';
import loginIcon from '../../assets/icons/login.svg';
import classes from './header.module.css';
import { userCardRequest, userProfileRequest, userWishListRequest } from '../../store/actions/users';

function Header() {
  const profile = useSelector((state) => state.users.profile);
  const wishlist = useSelector((state) => state.users.wishlist);
  const card = useSelector((state) => state.users.card);
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');
  useEffect(() => {
    (async () => {
      await dispatch(userProfileRequest());
    })();
  }, []);
  useEffect(() => {
    (async () => {
      await dispatch(userWishListRequest());
    })();
  }, []);
  useEffect(() => {
    (async () => {
      await dispatch(userCardRequest());
    })();
  }, []);
  return (
    <div className={`${classes.header}`}>
      <div className={`${classes.profile}`}>
        <Link to="/home">
          <img src={logo} alt="logo" />
        </Link>
      </div>
      <div className={`${classes.navbar}`}>
        <NavLink to="/home" className={`${classes.link}`}>Home</NavLink>
        <NavLink to="/catalog" className={`${classes.link}`}>Catalog</NavLink>
        <NavLink to="/new-books" className={`${classes.link}`}>New</NavLink>
        <NavLink to="/popular" className={`${classes.link}`}>Popular</NavLink>
        <NavLink to="/contact" className={`${classes.link}`}>Contact us</NavLink>
      </div>
      <div className={`${classes.profile}`}>
        <Link to={`/user/${profile.id}/card`}>
          <img src={basketIcon} alt="basketIcon" className="basket" />
          {card.length > 0 ? (
            <p className={`${classes.quantity}`}>
              {' '}
              {card.length}
            </p>
          ) : null}
        </Link>
        <Link to={`/user/${profile.id}/wishlist`}>
          <img src={wishListIcon} alt="wishListIcon" className="wish" />
          { wishlist.length > 0 ? (
            <p className={`${classes.quantity_wish}`}>
              {' '}
              {wishlist.length}
            </p>
          ) : null }
        </Link>
        {token ? (
          <Link to={`/user/${profile.id}`}>
            <img src={loginIcon} alt="loginIcon" className="login" />
          </Link>
        ) : (
          <Link to="/login">
            <img src={loginIcon} alt="loginIcon" className="login" />
          </Link>
        )}
      </div>
    </div>
  );
}

export default Header;
