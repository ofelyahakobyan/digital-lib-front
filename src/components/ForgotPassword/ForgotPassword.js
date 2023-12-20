import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Wrapper from '../Wrapper/Wrapper';
import forgotpassword from '../../assets/images/forgotpassword.png';
import classes from './forgotpassword.module.css';
import { forgotPasswordRequest } from '../../store/actions/users';

function ForgotPassword() {
  const dispatch = useDispatch();
  const message = useSelector((state) => state.users.message);
  const [showMessage, setShowMessage] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
  });
  const handleSubmit = useCallback(async (ev) => {
    ev.preventDefault();
    const { payload } = await dispatch(forgotPasswordRequest(formData));
    if (payload.status === 'success') {
      setShowMessage(true);
    } else {
      setShowMessage(false);
    }
  }, [formData]);

  const handleChange = useCallback((key) => (ev) => {
    setFormData({ ...formData, [key]: ev.target.value });
  }, [formData]);
  return (
    <Wrapper>
      <div className={`${classes.forgot_password}`}>
        <div className={`${classes.forgot_password}`}>
          <div className={`${classes.image_container}`}>
            <img src={forgotpassword} alt="forgot" className={`${classes.image}`} />
          </div>
          <div className={`${classes.form_container}`}>
            <h1 className={`${classes.title}`}> Forgot your password? </h1>
            <p className={`${classes.text}`}>
              Please enter the email you use to sign up.
            </p>
            <form onSubmit={handleSubmit} className={`${classes.form}`}>
              <label htmlFor="email" className={`${classes.label}`}>
                {' '}
                Email *
                <input id="email" type="email" value={formData.email} onChange={handleChange('email')} className={`${classes.input}`} />
              </label>
              <button type="submit" className={`${classes.button}`}> Forgot password </button>
              {showMessage ? (
                <p style={{ color: 'darkgreen' }}>
                  {' '}
                  {message}
                  {' '}
                </p>
              ) : (
                <p style={{ color: 'darkred' }}>
                  {' '}
                  {message}
                  {' '}
                </p>
              )}
              {showMessage ? <Link to="/reset-password"> Reset password</Link> : (
                <Link to="/login" className={`${classes.link}`}>
                  Go to Sign in
                </Link>
              )}
            </form>
          </div>
          <div />
        </div>
      </div>
    </Wrapper>
  );
}

export default ForgotPassword;
