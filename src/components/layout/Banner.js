import React from 'react';
import banner from '../../assets/images/banner.png';
import ButtonComponent from '../ButtonComponent';

function Banner() {
  return (
    <div className="banner">
      <div className="container">
        <div className="info">
          <h5> Discover a World of Knowledge </h5>
          {/* eslint-disable-next-line max-len */}
          <p> Explore our extensive collection of books encompassing various genres, including fiction, non-fiction, science, history, romance, mystery, and more.</p>
          <ButtonComponent buttonName="Explore more" color="primary" size="large" link="/new" />
        </div>
        <img src={banner} alt="banner" />
      </div>
    </div>
  );
}

export default Banner;
