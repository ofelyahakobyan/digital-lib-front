import React, { useCallback, useState } from 'react';
import axios from 'axios';
import classes from './contact.module.css';
import Wrapper from '../../components/Wrapper/Wrapper';

function Contact() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState({});
  const handleChange = useCallback((key) => (ev) => {
    setFormData({ ...formData, [key]: ev.target.value });
  }, [formData]);
  const handleSubmit = useCallback(async (ev) => {
    ev.preventDefault();
    try {
      const { data } = await axios.post('http://localhost:4000/api/v1/contacts', {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        message: formData.message,
      });
      setMessage(data.message);
      setError({
        firstName: '',
        lastName: '',
        email: '',
        message: '',
      });
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        message: '',
      });
      console.log(data);
    } catch (e) {
      console.error(e.response.data.errors);
      setError(e.response.data.errors);
    }
  }, [formData]);
  setTimeout(() => {
    setMessage('');
  }, 25000);
  return (
    <Wrapper>
      <div className={`${classes.register}`}>
        <div className={`${classes.container}`}>
          <div className={`${classes.form_container}`}>
            <h1 className={`${classes.title}`}> Contact us </h1>
            <form className={`${classes.form}`} onSubmit={handleSubmit}>
              <label htmlFor="first_name" className={`${classes.label}`}>
                {' '}
                First name *
                {error.firstName ? (
                  <p className={`${classes.error}`}>
                    {error.firstName}
                    {' '}
                  </p>
                ) : null}
                <input
                  id="first_name"
                  type="text"
                  value={formData.firstName}
                  onChange={handleChange('firstName')}
                  className={`${classes.input}`}
                />
              </label>
              <label htmlFor="last_name" className={`${classes.label}`}>
                {' '}
                Last name *
                {error.lastName ? (
                  <p className={`${classes.error}`}>
                    {error.lastName}
                    {' '}
                  </p>
                ) : null}
                {' '}
                <input
                  id="last_name"
                  type="text"
                  value={formData.lastName}
                  onChange={handleChange('lastName')}
                  className={`${classes.input}`}
                />
              </label>
              <label htmlFor="email" className={`${classes.label}`}>
                {' '}
                Email *
                {error.email ? (
                  <p className={`${classes.error}`}>
                    {error.email}
                    {' '}
                  </p>
                ) : null}
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange('email')}
                  className={`${classes.input}`}
                />
              </label>
              <label htmlFor="message" className={`${classes.label}`}>
                {' '}
                Message *
                {error.message ? (
                  <p className={`${classes.error}`}>
                    {error.message}
                    {' '}
                  </p>
                ) : null}
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={handleChange('message')}
                  className={`${classes.input}`}
                />
              </label>
              <button type="submit" className={`${classes.button}`}> SEND</button>
              {message ? <p className={`${classes.text}`}>{message}</p> : null}
            </form>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

export default Contact;
