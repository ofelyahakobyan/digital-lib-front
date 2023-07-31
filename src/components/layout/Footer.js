import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import location from '../../assets/icons/location.svg';
import phone from '../../assets/icons/phone.svg';
import facebook from '../../assets/icons/facebook.svg';
import twitter from '../../assets/icons/twitter.svg';
import pinterest from '../../assets/icons/pinterest.svg';
import instagram from '../../assets/icons/instagram.svg';
import payments from '../../assets/icons/icon-pay 1.jpg';
import logo from '../../assets/icons/logo.svg';

function Footer() {
  return (
    <div className="footer">
      <div className="subscribe">
        <div className="container">
          <p> Join our newsletter and get offers </p>
          <div className="email">
            <input type="email" placeholder="Enter your email" />
            <button type="button"> Subscribe</button>
          </div>
        </div>
      </div>
      <div className="general">
        <div className="container">
          <div className="text">
            <h4> Books: Unlocking Minds, Inspiring Souls </h4>
            <p>
              Reading is a passport to countless worlds, a journey that expands our minds, touches our hearts,
              and
              ignites our imagination.
            </p>
          </div>
          <div className="resources">
            <h4> Resources </h4>
            <NavLink to="/home">Home</NavLink>
            <NavLink to="/catalog">Catalog</NavLink>
            <NavLink to="/new">New</NavLink>
            <NavLink to="/popular">Popular</NavLink>
            <NavLink to="/bestseller">Bestseller</NavLink>
            <NavLink to="/contact_us">Contact us</NavLink>
          </div>
          <div className="catalog">
            <h4> Catalog </h4>
            <NavLink to="/catalog">Fiction</NavLink>
            <NavLink to="/catalog">Mistic</NavLink>
            <NavLink to="/catalog">Non-Fiction</NavLink>
            <NavLink to="/catalog">Documental</NavLink>
            <NavLink to="/new">New</NavLink>
          </div>
          <div className="contact">
            <h4> Contacts </h4>
            <div className="location">
              <img src={location} alt="location" />
              <p> California, USA </p>
            </div>
            <div className="phone">
              <img src={phone} alt="phone" />
              <p> +12012987481 </p>
            </div>

            <div />
          </div>
        </div>
        <div className="social">
          <div className="container">
            <div className="social_media">
              <p> &copy; Logo 2023 </p>
              <Link to="https://twitter.com/" target="_blank">
                <img src={twitter} alt="facebook" />
              </Link>
              <Link to="https://www.facebook.com/" target="_blank">
                <img src={facebook} alt="facebook" />
              </Link>
              <Link to="https://www.pinterest.com/" target="_blank">
                <img src={pinterest} alt="facebook" />
              </Link>
              <Link to="https://www.instagram.com/" target="_blank">
                <img src={instagram} alt="facebook" />
              </Link>
            </div>

            <div className="logo">
              <Link to="/home">
                <img src={logo} alt="logo" />
              </Link>
            </div>
            <div className="payments">
              <img src={payments} alt="payments" />
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Footer;
