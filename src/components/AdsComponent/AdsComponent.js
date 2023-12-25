import React from 'react';
import { Link } from 'react-router-dom';
import leftImage from '../../assets/images/leftImage.png';
import rightImage from '../../assets/images/rightImage.png';
import classes from './adscomponent.module.css';

function AdsComponent() {
  return (
    <div className={`${classes.ads}`}>
      <div className={`${classes.container}`}>
        <img src={leftImage} alt="books" className={`${classes.image}`} />
        <div className={`${classes.ad}`}>
          <h4 className={`${classes.title}`}> Latest news and updates </h4>
          <p className={`${classes.text}`}> Stay informed and inspired</p>
          <Link to="/new-books" className={`${classes.button}`}>More </Link>
        </div>
        <img src={rightImage} alt="books" className={`${classes.image}`} />
      </div>
    </div>
  );
}

export default AdsComponent;
