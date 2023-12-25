import React, { useCallback, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Wrapper from '../Wrapper/Wrapper';
import forgotpassword from '../../assets/images/forgotpassword.png';
import classes from '../ForgotPassword/forgotpassword.module.css';
import { resetPasswordRequest } from '../../store/actions/users';

function ResetPassword() {
  // eslint-disable-next-line no-undef
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [showMessage, setShowMessage] = useState(false);
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });
  const handleSubmit = useCallback(async (ev) => {
    ev.preventDefault();
    console.log(formData);
    const { payload } = await dispatch(resetPasswordRequest({
      newPassword: formData.confirmPassword,
      code: searchParams.get('code'),
      email: searchParams.get('email'),
    }));
    if (formData.password !== formData.confirmPassword) {
      setShowMessage("Passwords doesn't match");
    }
    if (payload.status === 'error') {
      setShowMessage(payload.message);
    }
    if (payload.status === 'success') {
      setShowMessage(payload.message);
    }
  }, [formData]);
  setTimeout(() => {
    if (showMessage === 'password successfully changed') {
      navigate('/login');
    }
  }, 5000);
  const handleChange = useCallback((key) => (ev) => {
    setFormData({ [key]: ev.target.value });
  }, [formData]);
  return (
    <Wrapper>
      <div className={`${classes.forgot_password}`}>
        <div className={`${classes.forgot_password}`}>
          <div className={`${classes.image_container}`}>
            <img src={forgotpassword} alt="forgot" className={`${classes.image}`} />
          </div>
          <div className={`${classes.form_container}`}>
            <h1 className={`${classes.title}`}> New password </h1>
            <p className={`${classes.text}`}>
              Choose a Strong Password and Keep it Unique.
            </p>
            <form onSubmit={handleSubmit} className={`${classes.form}`}>
              <label htmlFor="password" className={`${classes.label}`}>
                {' '}
                Password *
                <input id="password" type="password" value={formData.password} onChange={handleChange('password')} className={`${classes.input}`} />
              </label>
              <label htmlFor="confirmPassword" className={`${classes.label}`}>
                {' '}
                Confirm password *
                <input id="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange('confirmPassword')} className={`${classes.input}`} />
              </label>
              <button type="submit" className={`${classes.button}`}> Reset password </button>
              {!showMessage === 'User is not found or invalid verification code.' ? (
                <p style={{ color: 'darkgreen', textAlign: 'centre', padding: 15 }}>
                  {' '}
                  {showMessage}
                  {' '}
                </p>
              ) : (
                <p style={{ color: 'darkred', textAlign: 'centre', padding: 15 }}>
                  {' '}
                  {showMessage}
                  {' '}
                </p>
              )}
            </form>
          </div>
          <div />
        </div>
      </div>
    </Wrapper>
  );
}

export default ResetPassword;
