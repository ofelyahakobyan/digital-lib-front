import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import signup from '../assets/images/signup.png';
import Wrapper from './layout/Wrapper';
import Google from '../assets/icons/google.svg';
import Facebook from '../assets/icons/face.svg';
import { registerRequest } from '../store/actions/users';

function SignUp() {
  const dispatch = useDispatch();
  const errors = useSelector((state) => state.users.errors);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
    confirmPassword: '',
  });
  const handleChange = useCallback((key) => (ev) => {
    setFormData({ ...formData, [key]: ev.target.value });
  }, [formData]);
  const handleSubmit = useCallback(
    async (ev) => {
      ev.preventDefault();
      const { payload } = await dispatch(registerRequest(formData));
      if (formData.password !== formData.confirmPassword) {
        setError("Passwords doesn't match");
      } else if (payload.status === 'error') {
        setMessage(payload.message);
      } else if (payload.status === 'success') {
        setMessage(payload.message);
      }
    },
    [formData, error, errors],
  );

  return (
    <Wrapper>
      <div className="sign_up">
        <div className="container">
          <div className="image_container">
            <img src={signup} alt="signup" />
          </div>
          <div className="form_container">
            <h1> Welcome to Digital Library !</h1>
            <p> Create your account in seconds</p>
            <form className="form" onSubmit={handleSubmit}>
              <label htmlFor="first_name" className="label">
                {' '}
                First name *
                {' '}
                {errors.firstName ? (
                  <span className="error">
                    {errors.firstName}
                  </span>
                ) : null}
                <input id="first_name" type="text" value={formData.firstName} onChange={handleChange('firstName')} className={errors.firstName ? 'error-input' : 'input'} />
              </label>
              <label htmlFor="last_name" className="label">
                {' '}
                Last name *
                {' '}
                {errors.lastName ? <span className="error">{errors.lastName}</span> : null}
                <input id="last_name" type="text" value={formData.lastName} onChange={handleChange('lastName')} className={errors.lastName ? 'error-input' : 'input'} />
              </label>
              <label htmlFor="email" className="label">
                {' '}
                Email *
                {message === 'user with this email already registered' ? (
                  <p style={{ color: 'darkred' }}>
                    {' '}
                    {message}
                    {' '}
                  </p>
                ) : null}
                {errors.email ? <span className="error">{errors.email}</span> : null}
                <input id="email" type="email" value={formData.email} onChange={handleChange('email')} className={errors.email || message === 'user with this email already registered' ? 'error-input' : 'input'} />
              </label>
              <label htmlFor="phone" className="label">
                {' '}
                Phone
                <input id="phone" type="number" value={formData.phone} onChange={handleChange('phone')} className="input" />
              </label>
              <label htmlFor="password" className="label">
                {' '}
                Password*
                {errors.password ? <span className="error">{errors.password}</span> : null}
                <input id="password" type="password" value={formData.password} onChange={handleChange('password')} className={errors.password ? 'error-input' : 'input'} />
              </label>
              <label htmlFor="confirm-password" className="label">
                {' '}
                Confirm Password*
                {' '}
                {error ? <span className="error">{error}</span> : null}
                <input id="confirm-password" type="password" value={formData.confirmPassword} onChange={handleChange('confirmPassword')} className={error ? 'error-input' : 'input'} />
              </label>
              <button type="submit"> Sign up</button>
              {message === 'new user was successfully registered' ? (
                <div className="success">
                  <p>
                    {' '}
                    {message }
                  </p>
                  <Link to="/login"> Sign in </Link>
                </div>
              ) : null}
            </form>
            <div className="social_media">
              <div className="suggestion">
                <hr />
                <h2> Or </h2>
                <hr />
              </div>
              <div className="icons">
                <img src={Google} alt="google" />
                <img src={Facebook} alt="facebook" style={{ marginLeft: 50 }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

export default SignUp;
