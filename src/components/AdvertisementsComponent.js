import React from 'react';
import leftImage from '../assets/images/leftImage.png';
import rightImage from '../assets/images/rightImage.png';
import ButtonComponent from './ButtonComponent';

function AdvertisementsComponent() {
  return (
    <div className="advertisement_component">
      <div className="container">
        <img src={rightImage} alt="books" />
        <div className="ad">
          <h4> Latest news and updates </h4>
          <p> Stay informed and inspired</p>
          <ButtonComponent buttonName="More" size="large" color="secondary" link="/new" />
        </div>
        <img src={leftImage} alt="books" />
      </div>
    </div>
  );
}

export default AdvertisementsComponent;
