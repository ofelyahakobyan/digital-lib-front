import React, { useCallback, useState } from 'react';
import axios from 'axios';
import classes from './subscribe.module.css';

function Subscribe() {
  const [value, setValue] = useState('');
  const [info, setInfo] = useState('');
  const handleChange = useCallback((ev) => {
    setValue(ev.target.value);
  }, [value]);
  const handleClick = useCallback(async () => {
    try {
      const { data } = await axios.post('http://localhost:4000/api/v1/subscribers/add', { email: value });
      setInfo(data.message);
      setTimeout(() => {
        setInfo('');
      }, 5000);
    } catch (e) {
      setInfo(e.response.data.message);
      setTimeout(() => {
        setInfo('');
      }, 5000);
    }
  }, [value]);
  return (
    <div className={`${classes.subscribe}`}>
      <div className={`${classes.container}`}>
        <div className={`${classes.email}`}>
          <p className={`${classes.info}`}> Join our newsletter and get offers </p>
        </div>
        <div className={`${classes.email}`}>
          <input
            type="email"
            placeholder="Enter your email"
            className={`${classes.input}`}
            onChange={handleChange}
            value={value}
          />
          <button
            type="button"
            className={`${classes.button}`}
            onClick={handleClick}
          >
            {' '}
            Subscribe
          </button>
        </div>
      </div>
      {info === 'user was successfully subscribed' ? (
        <p className={`${classes.info_success}`}>
          {' '}
          {info}
        </p>
      )
        : (
          <p className={`${classes.info_fail}`}>
            {' '}
            {info}
          </p>
        ) }
    </div>
  );
}

export default Subscribe;
