import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Wrapper from '../Wrapper/Wrapper';
import signup from '../../assets/images/signup.png';
// import Google from '../../assets/icons/google.svg';
// import Facebook from '../../assets/icons/face.svg';
import classes from './registration.module.css';
import { registerRequest } from '../../store/actions/users';

function Registration() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const errors = useSelector((state) => state.users.errors);
  const [message, setMessage] = useState('');
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
        setMessage("Passwords doesn't match");
      } else if (payload.status === 'error' && payload.code === 409) {
        setMessage(payload.errors.message);
      } else if (payload.status === 'success') {
        setMessage(payload.message);
      }
    },
    [formData, errors, message],
  );
  setTimeout(() => {
    if (message === 'new user was successfully registered') {
      navigate('/login');
    }
  }, 3000);

  return (
    <Wrapper>
      <div className={`${classes.register}`}>
        <div className={`${classes.container}`}>
          <div className={`${classes.image_container}`}>
            <img src={signup} alt="signup" className={`${classes.image}`} />
          </div>
          <div className={`${classes.form_container}`}>
            <h1 className={`${classes.title}`}> Welcome to Digital Library !</h1>
            <p className={`${classes.text}`}> Create your account in seconds</p>
            <form className={`${classes.form}`} onSubmit={handleSubmit}>
              <label htmlFor="first_name" className={`${classes.label}`}>
                {' '}
                First name *
                {' '}
                {errors.firstName ? (
                  <span className={`${classes.error}`}>
                    {errors.firstName}
                  </span>
                ) : null}
                <input id="first_name" type="text" value={formData.firstName} onChange={handleChange('firstName')} className={errors.firstName ? `${classes.error_input}` : `${classes.input}`} />
              </label>
              <label htmlFor="last_name" className={`${classes.label}`}>
                {' '}
                Last name *
                {' '}
                {errors.lastName ? <span className={`${classes.error}`}>{errors.lastName}</span> : null}
                <input id="last_name" type="text" value={formData.lastName} onChange={handleChange('lastName')} className={errors.lastName ? `${classes.error_input}` : `${classes.input}`} />
              </label>
              <label htmlFor="email" className={`${classes.label}`}>
                {' '}
                Email *
                {message === 'user with this email already registered' ? (
                  <p style={{ color: 'darkred' }}>
                    {' '}
                    {message}
                    {' '}
                  </p>
                ) : null}
                {errors.email ? <span className={`${classes.error}`}>{errors.email}</span> : null}
                <input id="email" type="email" value={formData.email} onChange={handleChange('email')} className={message === 'user with this email already registered' || errors.email ? `${classes.error_input}` : `${classes.input}`} />
              </label>
              <label htmlFor="password" className={`${classes.label}`}>
                {' '}
                Password*
                {errors.password ? <span className={`${classes.error}`}>{errors.password}</span> : null}
                <input id="password" type="password" value={formData.password} onChange={handleChange('password')} className={errors.password ? `${classes.error_input}` : `${classes.input}`} />
              </label>
              <label htmlFor="confirm-password" className={`${classes.label}`}>
                {' '}
                Confirm Password*
                {' '}
                {message === "Passwords doesn't match" ? <span className={`${classes.error}`}>{message}</span> : null}
                <input id="confirm-password" type="password" value={formData.confirmPassword} onChange={handleChange('confirmPassword')} className={message === "Passwords doesn't match" ? `${classes.error_input}` : `${classes.input}`} />
              </label>
              <button type="submit" className={`${classes.button}`}> Sign up</button>
              {message === 'new user was successfully registered' ? (
                <div className={`${classes.success}`}>
                  <p className={`${classes.success_info}`}>
                    {' '}
                    {message }
                    <br />
                    Redirecting to ...
                  </p>
                </div>
              ) : null}
            </form>
            {/* <div className={`${classes.social_media}`}>
              <div className={`${classes.suggestion}`}>
                <hr className={`${classes.line}`} />
                <h2 className={`${classes.title}`}> Or </h2>
                <hr className={`${classes.line}`} />
              </div>
              <div className={`${classes.icons}`}>
                <img src={Google} alt="google" />
                <img src={Facebook} alt="facebook" style={{ marginLeft: 50 }} />
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

export default Registration;
