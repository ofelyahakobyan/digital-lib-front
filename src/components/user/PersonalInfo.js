import React from 'react';
import UserNavigation from './UserNavigation';
import Wrapper from '../layout/Wrapper';
import edit from '../../assets/profile_icons/edit.svg';
import add from '../../assets/profile_icons/add.svg';

function PersonalInfo() {
  return (
    <Wrapper>
      <div className="personal-info">
        <UserNavigation />
        <div className="info">
          <h1>Personal information </h1>
          {/* eslint-disable-next-line max-len */}
          <p className="info-text">The information you provide helps us enhance your user experience, tailor our services to your needs, and ensure the seamless functioning of our platform.</p>
          <div className="info-edit">
            <p> email address </p>
            <img src={edit} alt="edit" />
          </div>
          <div className="info-edit">
            <p> phone number  </p>
            <img src={add} alt="add" />
          </div>
          <div className="info-edit">
            <p> change password </p>
            <img src={edit} alt="edit" />
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

export default PersonalInfo;
