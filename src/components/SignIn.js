import React, { useCallback, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Signin from '../assets/images/signin.png';
import Wrapper from './layout/Wrapper';
import Google from '../assets/icons/google.svg';
import Facebook from '../assets/icons/face.svg';
import { loginRequest } from '../store/actions/users';

function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const handleChange = useCallback((key) => (ev) => {
    setError('');
    setFormData({ ...formData, [key]: ev.target.value });
  }, [formData]);

  const handleSubmit = useCallback(async (ev) => {
    ev.preventDefault();
    const { payload } = await dispatch(loginRequest(formData));
    // console.log(payload);
    if (payload.status === 'error') {
      setError(payload.message);
    } else if (payload.status === 'success') {
      navigate(`/user/${payload.user.id}`);
    }
  }, [formData]);

  return (
    <Wrapper>
      <div className="sign_in">
        <div className="container">
          <div className="image_container">
            <img src={Signin} alt="signin" />
          </div>
          <div className="form_container">
            <h1> Sign in </h1>
            <p>
              {' '}
              Don`t have an account?
              <Link to="/register"> Create Now </Link>
            </p>
            <form onSubmit={handleSubmit} className="form">
              <label htmlFor="email" className="label">
                {' '}
                Email *
                <input id="email" type="email" value={formData.email} onChange={handleChange('email')} className={error ? 'error-input' : 'input'} />
                {error ? <p className="error">{error}</p> : null}
              </label>
              <label htmlFor="password" className="label">
                {' '}
                Password*
                <input id="password" type="password" value={formData.password} onChange={handleChange('password')} className={error ? 'error-input' : 'input'} />
                {error ? <p className="error">{error}</p> : null}
              </label>
              <Link to="/forgot-password" style={{ color: 'black' }}>
                Forgot a password?
              </Link>
              <button type="submit"> Sign in</button>
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
          <div />
        </div>
      </div>
    </Wrapper>
  );
}

export default SignIn;
