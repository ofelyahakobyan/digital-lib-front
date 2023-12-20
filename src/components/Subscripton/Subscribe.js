import React from 'react';
import classes from './subscribe.module.css';

function Subscribe() {
  return (
    <div className={`${classes.subscribe}`}>
      <div className={`${classes.container}`}>
        <div className={`${classes.email}`}>
          <p className={`${classes.info}`}> Join our newsletter and get offers </p>
        </div>
        <div className={`${classes.email}`}>
          <input type="email" placeholder="Enter your email" className={`${classes.input}`} />
          <button type="button" className={`${classes.button}`}> Subscribe</button>
        </div>
      </div>
    </div>
  );
}

export default Subscribe;
