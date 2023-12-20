import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { userProfileRequest } from '../../store/actions/users';
import Wrapper from '../../components/Wrapper/Wrapper';
import UserNavigation from './UserNavigation';
import classes from './profile.module.css';

function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const profile = useSelector((state) => state.users.profile);
  const { id } = useParams();
  useEffect(() => {
    (async () => {
      if (id) {
        await dispatch(userProfileRequest());
      }
    })();
  }, [id]);
  const handleClick = useCallback(() => {
    navigate(`/user/${profile.id}/update-info`);
  }, []);

  return (
    <Wrapper>
      <div className={`${classes.personal_info}`}>
        <UserNavigation />
        <div className={`${classes.about}`}>
          <h1 className={`${classes.title}`}>Personal information </h1>
          {/* eslint-disable-next-line max-len */}
          <p className={`${classes.info_text}`}>
            The information you provide helps us enhance your user experience, tailor our
            services to your needs, and ensure the seamless functioning of our platform.
          </p>
          <div className={`${classes.about_item}`}>
            <p className={`${classes.info}`}>Your full name </p>
            <p className={`${classes.info}`}>
              {profile.firstName}
              {' '}
              {profile.lastName}
            </p>
          </div>
          <div className={`${classes.about_item}`}>
            <p className={`${classes.info}`}>Your phone number </p>
            <p className={`${classes.info}`}>
              {' '}
              {profile.phone}
            </p>
          </div>
          <div className={`${classes.about_item}`}>
            <p className={`${classes.info}`}>Your nick name </p>
            <p className={`${classes.info}`}>
              {' '}
              {profile.nickName}
            </p>
          </div>
          <div className={`${classes.about_item}`}>
            <p className={`${classes.info}`}>About you </p>
            <p className={`${classes.info}`}>
              {' '}
              {profile.shortAbout}
            </p>
          </div>
          <button type="button" className={`${classes.change_button}`} onClick={handleClick}> Edit </button>
        </div>

      </div>

    </Wrapper>
  );
}

export default Profile;
