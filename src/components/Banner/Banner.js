import React from 'react';
import { Link } from 'react-router-dom';
import banner from '../../assets/images/banner.png';
import classes from './banner.module.css';

function Banner() {
  return (
    <div className={`${classes.banner}`}>
      <div className={`${classes.container}`}>
        <div className={`${classes.info}`}>
          <h5 className={`${classes.title}`}> Discover a World of Knowledge </h5>
          {/* eslint-disable-next-line max-len */}
          <p className={`${classes.text}`}> Explore our extensive collection of books encompassing various genres, including fiction, non-fiction, science, history, romance, mystery, and more.</p>
          <Link to="/catalog" className={`${classes.button}`}> Explore more </Link>
        </div>
        <div className={`${classes.image}`}>
          <img src={banner} alt="banner" className={`${classes.banner_image}`} />
        </div>
      </div>
    </div>
  );
}

export default Banner;
