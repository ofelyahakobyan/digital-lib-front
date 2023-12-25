import React, { useCallback, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Signin from '../../assets/images/signin.png';
import Wrapper from '../Wrapper/Wrapper';
// import Google from '../../assets/icons/google.svg';
// import Facebook from '../../assets/icons/face.svg';
import classes from './login.module.css';
import { loginRequest } from '../../store/actions/users';

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const handleSubmit = useCallback(async (ev) => {
    ev.preventDefault();
    const { payload } = await dispatch(loginRequest(formData));
    console.log(payload);
    if (payload.status === 'error') {
      setError(payload.message);
    } else if (payload.status === 'success') {
      navigate(`/user/${payload.user.id}`);
    }
  }, [formData]);
  const handleChange = useCallback((key) => (ev) => {
    setError('');
    setFormData({ ...formData, [key]: ev.target.value });
  }, [formData]);
  return (
    <Wrapper>
      <div className={`${classes.login}`}>
        <div className={`${classes.container}`}>
          <div className={`${classes.image_container}`}>
            <img src={Signin} alt="signin" className={`${classes.image}`} />
          </div>
          <div className={`${classes.form_container}`}>
            <h1 className={`${classes.title}`}> Sign in </h1>
            <p className={`${classes.text}`}>
              {' '}
              Don`t have an account?
              <Link to="/registration" className={`${classes.link}`}> Create Now </Link>
            </p>
            <form onSubmit={handleSubmit} className={`${classes.form}`}>
              <label htmlFor="email" className={`${classes.label}`}>
                {' '}
                Email *
                <input id="email" type="email" value={formData.email} onChange={handleChange('email')} className={error ? `${classes.error_input}` : `${classes.input}`} />
                {error ? (
                  <p className={`${classes.error}`}>
                    {error}
                    {' '}
                  </p>
                ) : null}
              </label>
              <label htmlFor="password" className={`${classes.label}`}>
                {' '}
                Password*
                <input id="password" type="password" value={formData.password} onChange={handleChange('password')} className={error ? `${classes.error_input}` : `${classes.input}`} />
                {error ? <p className={`${classes.error}`}>{error}</p> : null}
              </label>
              <Link to="/forgot-password" className={`${classes.link}`}>
                Forgot a password?
              </Link>
              <button type="submit" className={`${classes.button}`}> Sign in</button>
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
          <div />
        </div>
      </div>
    </Wrapper>
  );
}

export default Login;
