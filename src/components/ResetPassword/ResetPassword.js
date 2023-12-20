import React, { useCallback, useState } from 'react';
import Wrapper from '../Wrapper/Wrapper';
import forgotpassword from '../../assets/images/forgotpassword.png';
import classes from '../ForgotPassword/forgotpassword.module.css';

function ResetPassword() {
  const [showMessage, setShowMessage] = useState(false);
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });
  const handleSubmit = useCallback(() => {
    setShowMessage('');
    setFormData('');
  }, []);
  const handleChange = useCallback(() => {

  }, []);
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
                <input id="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange('password')} className={`${classes.input}`} />
              </label>
              <button type="submit" className={`${classes.button}`}> Reset password </button>
              {showMessage ? (
                <p style={{ color: 'darkgreen' }}>
                  {' '}
                  {/* {message} */}
                  {' '}
                </p>
              ) : (
                <p style={{ color: 'darkred' }}>
                  {' '}
                  {/* {message} */}
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
