import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Wrapper from '../../components/Wrapper/Wrapper';
import UserNavigation from './UserNavigation';
import classes from './profile.module.css';
import { userEditProfileRequest } from '../../store/actions/users';

function ChangeInfo() {
  const dispatch = useDispatch();
  const [message, setMessage] = useState('');
  const profile = useSelector((state) => state.users.profile);
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
  }, [formData]);
  const handleSubmitUserInfo = useCallback(
    async (ev) => {
      ev.preventDefault();
      const { payload } = await dispatch(userEditProfileRequest({
        phone: formData.phone || profile.phone,
        firstName: formData.firstName || profile.firstName,
        lastName: formData.lastName || profile.lastName,
        shortAbout: formData.shortAbout || profile.shortAbout,
        avatar: formData.avatar || profile.avatar,
        nickName: formData.nickName || profile.nickName,
      }));
      if (payload.status === 'success' && (formData.avatar || formData.firstName || formData.lastName || formData.phone)) {
        setMessage(`Your personal information was ${payload.status}fuly changed`);
      } else if (payload.status === 'error') {
        setMessage(payload.message);
        console.log(message);
      } else if (payload.status === 'success' && !(formData.avatar || formData.firstName || formData.lastName || formData.phone)) {
        setMessage("You didn't change anything");
      }
    },
    [formData],
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
          <form onSubmit={handleSubmitUserInfo}>
            <input
              type="text"
              placeholder="first name"
              value={formData.firstName}
              onChange={handleChange('firstName')}
              className={`${classes.input}`}
            />
            <input
              type="text"
              placeholder="last name"
              value={formData.lastName}
              onChange={handleChange('lastName')}
              className={`${classes.input}`}
            />
            <input
              type="text"
              placeholder="nikName"
              value={formData.nickName}
              onChange={handleChange('nickName')}
              className={`${classes.input}`}
            />
            <input
              type="number"
              placeholder="phone number"
              value={formData.phone}
              onChange={handleChange('phone')}
              className={`${classes.input}`}
            />
            {/*   <input
              type="file"
              placeholder="avatar"
              value={formData.avatar}
              onChange={handleChange('avatar')}
              className={`${classes.input}`}
            /> */}
            <input
              type="text"
              placeholder="shortAbout"
              value={formData.shortAbout}
              onChange={handleChange('shortAbout')}
              className={`${classes.input}`}
            />
            <button type="submit" className={`${classes.change_button}`}> Confirm</button>
          </form>
          {message === 'Your personal information was successfuly changed' ? <p className={`${classes.paragraph}`}>{message}</p>
            : <p className={`${classes.paragraph_error}`}>{message}</p>}
        </div>
      </div>
    </Wrapper>
  );
}

export default ChangeInfo;
