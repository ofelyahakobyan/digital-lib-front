import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import UserNavigation from './UserNavigation';
import edit from '../../assets/icons/edit.svg';
import add from '../../assets/icons/add.svg';
import { changePasswordRequest, userEditProfileRequest } from '../../store/actions/users';
import Wrapper from '../../components/Wrapper/Wrapper';
import classes from './profile.module.css';

function ChangePersonalInfo() {
  const dispatch = useDispatch();
  const [message, setMessage] = useState('');
  const [showChangeBar, setShowChangeBar] = useState('');
  const [disable, setDisable] = useState(false);
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    nickName: '',
    phone: '',
    firstName: '',
    lastName: '',
    avatar: '',
    shortAbout: '',
  });
  const handleChange = useCallback((key) => (ev) => {
    setFormData({ ...formData, [key]: ev.target.value });
    setMessage('');
  }, [formData, message]);
  const handleEdit = useCallback(() => {
    setShowChangeBar('password');
    setMessage('');
  }, [showChangeBar, message]);
  const handleEditNickName = useCallback(() => {
    setShowChangeBar('firstName');
    setMessage('');
  }, [showChangeBar, message]);
  const handleEditPhone = useCallback(() => {
    setShowChangeBar('phone');
    setMessage('');
  }, [showChangeBar, message]);
  const handleSubmit = useCallback(
    async (ev) => {
      ev.preventDefault();
      const { payload } = await dispatch(changePasswordRequest(formData));
      if (payload.status === 'success') {
        setMessage(`Your password was ${payload.status}fuly changed`);
      } else if (payload.status === 'error') {
        setMessage('Current password is incorrect, try again');
      }
    },
    [formData, message, disable],
  );
  const handleSubmitUserInfo = useCallback(
    async (ev) => {
      ev.preventDefault();
      const { payload } = await dispatch(userEditProfileRequest({ phone: formData.phone }));
      if (payload.status === 'success') {
        setMessage(`Your phone number was ${payload.status}fuly changed`);
      } else if (payload.status === 'error') {
        setMessage("You didn't change your phone number");
      }
      setDisable(true);
    },
    [formData.phone, message, disable],
  );
  const handleSubmitfirstName = useCallback(
    async (ev) => {
      ev.preventDefault();
      const { payload } = await dispatch(userEditProfileRequest({ firstName: formData.firstName }));
      if (payload.status === 'success') {
        setMessage(`Your name was ${payload.status}fuly changed`);
      } else if (payload.status === 'error') {
        setMessage("You didn't change your name");
      }
    },
    [formData.firstName, message, disable],
  );
  return (
    <Wrapper>
      <div className={`${classes.personal_info}`}>
        <UserNavigation />
        <div>
          <h1 className={`${classes.title}`}>Personal information </h1>
          {/* eslint-disable-next-line max-len */}
          <p className={`${classes.info_text}`}>
            The information you provide helps us enhance your user experience, tailor our
            services to your needs, and ensure the seamless functioning of our platform.
          </p>
          <div className={`${classes.info_edit}`}>
            <p> first name </p>
            <button type="button" className={`${classes.button}`} onClick={handleEditNickName}>
              <img src={edit} alt="edit" />
            </button>
          </div>
          <div className={`${classes.info_edit}`}>
            <p> phone number </p>
            <button type="button" className={`${classes.button}`} onClick={handleEditPhone}>
              <img src={add} alt="add" />
            </button>
          </div>
          <div className={`${classes.info_edit}`}>
            <p> change password </p>
            <button type="button" className={`${classes.button}`} onClick={handleEdit}>
              <img src={edit} alt="edit" />
            </button>
          </div>
          {/* eslint-disable-next-line no-nested-ternary */}
          {showChangeBar === 'firstName' ? (!message
            ? (
              <form onSubmit={handleSubmitfirstName} className="change-password">
                <input
                  type="text"
                  placeholder="first name"
                  value={formData.firstName}
                  onChange={handleChange('firstName')}
                  className={`${classes.input}`}
                />
                <button type="submit" className={`${classes.change_button}`}> Confirm</button>
              </form>
            ) : (
              message === 'Your name was successfuly changed'
                ? (
                  <p className={`${classes.paragraph}`}>
                    {message}
                  </p>
                ) : (
                  <p className={`${classes.paragraph_error}`}>
                    {message}
                  </p>
                )
            )
          ) : null}
          {/* eslint-disable-next-line no-nested-ternary */}
          {showChangeBar === 'phone' ? (!message
            ? (
              <form onSubmit={handleSubmitUserInfo} className="change-password">
                <input
                  type="number"
                  placeholder="phone number"
                  value={formData.phone}
                  onChange={handleChange('phone')}
                  className={`${classes.input}`}
                />
                <button type="submit" className={`${classes.change_button}`}> Confirm</button>
              </form>
            ) : (
              message === 'Your phone number was successfuly changed'
                ? (
                  <p className={`${classes.paragraph}`}>
                    {message}
                  </p>
                ) : (
                  <p className={`${classes.paragraph_error}`}>
                    {' '}
                    {message}
                  </p>
                ))
          ) : null}
          {/* eslint-disable-next-line no-nested-ternary */}
          {showChangeBar === 'password'
          // eslint-disable-next-line no-nested-ternary
            ? (!message
              ? (
                <form onSubmit={handleSubmit} className={`${classes.change_password}`}>
                  <input
                    type="password"
                    placeholder="current password"
                    value={formData.currentPassword}
                    onChange={handleChange('currentPassword')}
                    className={`${classes.input}`}
                  />
                  <input
                    type="password"
                    placeholder="new password"
                    value={formData.newPassword}
                    onChange={handleChange('newPassword')}
                    className={`${classes.input}`}
                  />
                  <button type="submit" className={`${classes.change_button}`}> Confirm </button>
                </form>
              ) : (
                message === 'Your password was successfuly changed'
                  ? (
                    <p className={`${classes.paragraph}`}>
                      {message}
                    </p>
                  ) : (
                    <p className={`${classes.paragraph_error}`}>
                      {' '}
                      {message}
                    </p>
                  )
              )
            ) : null}
        </div>
      </div>
    </Wrapper>
  );
}

export default ChangePersonalInfo;
