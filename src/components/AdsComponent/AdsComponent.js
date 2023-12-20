import React from 'react';
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
          <button type="button" className={`${classes.button}`}>More </button>
        </div>
        <img src={rightImage} alt="books" className={`${classes.image}`} />
      </div>
    </div>
  );
}

export default AdsComponent;
