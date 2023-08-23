import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import forgotpassword from '../assets/images/forgotpassword.png';
import Wrapper from './layout/Wrapper';
import { forgotPasswordRequest } from '../store/actions/users';

function ForgotPassword() {
  const dispatch = useDispatch();
  const [showMessage, setShowMessage] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
  });
  const message = useSelector((state) => state.users.message);
  const handleChange = useCallback((key) => (ev) => {
    setFormData({ ...formData, [key]: ev.target.value });
  }, [formData]);
  const handleSubmit = useCallback(async (ev) => {
    ev.preventDefault();
    const { payload } = await dispatch(forgotPasswordRequest(formData));
    if (payload.status === 'success') {
      setShowMessage(true);
    } else {
      setShowMessage(false);
    }
  }, [formData]);

  return (
    <Wrapper>
      <div className="forgot_password">
        <div className="container">
          <div className="image_container">
            <img src={forgotpassword} alt="forgot" />
          </div>
          <div className="form_container">
            <h1> Forgot your password? </h1>
            <p>
              Please enter the email you use to sign up.
            </p>
            <form onSubmit={handleSubmit} className="form">
              <label htmlFor="email" className="label">
                {' '}
                Email *
                <input id="email" type="email" value={formData.email} onChange={handleChange('email')} />
              </label>
              <button type="submit"> Forgot password </button>
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
                <Link to="/login">
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
