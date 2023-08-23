import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import forgotPassword from '../assets/images/forgotpassword.png';
import Wrapper from './layout/Wrapper';
import { resetPasswordRequest } from '../store/actions/users';

function ResetPassword() {
  const dispatch = useDispatch();
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    code: '',
    email: '',
    newPassword: '',
    confirmPassword: '',

  });
  const handleChange = useCallback((key) => (ev) => {
    setFormData({ ...formData, [key]: ev.target.value });
  }, [formData]);
  const handleSubmit = useCallback(async (ev) => {
    ev.preventDefault();
    const { payload } = await dispatch(resetPasswordRequest(formData));
    if (formData.newPassword !== formData.confirmPassword) {
      setMessage("Passwords doesn't match");
    } else {
      setMessage(payload.message);
      setFormData({
        email: '',
        newPassword: '',
        code: '',
        confirmPassword: '',
      });
    }
  }, [formData]);
  return (
    <Wrapper>
      <div className="reset_password">
        <div className="container">
          <div className="image_container">
            <img src={forgotPassword} alt="signin" />
          </div>
          <div className="form_container">
            <h1> New password </h1>
            <p>
              Choose a Strong Password and Keep it Unique.
            </p>
            <form onSubmit={handleSubmit} className="form">
              <label htmlFor="email" className="label">
                {' '}
                Email*
                <input id="email" type="email" value={formData.email} onChange={handleChange('email')} />
              </label>
              <label htmlFor="password" className="label">
                {' '}
                Password*
                <input id="password" type="password" value={formData.newPassword} onChange={handleChange('newPassword')} />
              </label>
              <label htmlFor="confirm-password" className="label">
                {' '}
                Confirm Password*
                <input id="confirm-password" type="password" value={formData.confirmPassword} onChange={handleChange('confirmPassword')} />
              </label>
              <label htmlFor="code" className="label">
                {' '}
                Verification code *
                <input id="code" type="text" value={formData.code} onChange={handleChange('code')} />
              </label>
              <button type="submit"> Reset password </button>
              <div className="success">
                {message ? (
                  <p>
                    {' '}
                    { message }
                    {' '}
                  </p>
                ) : null}
                {message === 'password successfully changed' ? <Link to="/login" className="sign-in"> Sign in </Link> : null}
              </div>
            </form>
          </div>
          <div />
        </div>
      </div>
    </Wrapper>
  );
}

export default ResetPassword;
