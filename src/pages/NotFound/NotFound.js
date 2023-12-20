import React from 'react';
import Wrapper from '../../components/Wrapper/Wrapper';
import classes from './notfound.module.css';

function NotFound() {
  return (
    <Wrapper>
      <div className={`${classes.not_found}`}>
        <p className={`${classes.text}`}> The requested page is not found </p>
      </div>
    </Wrapper>
  );
}

export default NotFound;
