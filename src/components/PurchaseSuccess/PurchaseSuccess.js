import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import purchase from '../../assets/images/purchase.png';
import Wrapper from '../Wrapper/Wrapper';
import classes from './purchaseSuccess.module.css';

function PurchaseSuccess() {
  const profile = useSelector((state) => state.users.profile);
  return (
    <Wrapper>
      <div className={`${classes.purchase}`}>
        <img src={purchase} alt="purchase" />
        <p className={`${classes.text}`}> Thank you for choosing our digital library to satisfy your reading cravings! </p>
        <Link to={`/user-books/${profile.id}`} className={`${classes.button}`}> Done </Link>
      </div>
    </Wrapper>
  );
}

export default PurchaseSuccess;
