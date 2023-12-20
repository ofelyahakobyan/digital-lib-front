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
import classes from './footer.module.css';

function Footer() {
  return (
    <div className={`${classes.footer}`}>
      <div className={`${classes.container}`}>
        <div className={`${classes.footer_container}`}>
          <div className={`${classes.component}`}>
            <h2 className={`${classes.title}`}> Books: Unlocking Minds, Inspiring Souls </h2>
            <p className={`${classes.info}`}>
              {/* eslint-disable-next-line max-len */}
              Reading is a passport to countless worlds, a journey that expands our minds, touches our hearts,
              and ignites our imagination.
            </p>
          </div>
          <div className={`${classes.catalog}`}>
            <h4 className={`${classes.title}`}> Resources </h4>
            <NavLink to="/home" className={`${classes.link}`}>Home</NavLink>
            <NavLink to="/catalog" className={`${classes.link}`}>Catalog</NavLink>
            <NavLink to="/new" className={`${classes.link}`}>New</NavLink>
            <NavLink to="/popular" className={`${classes.link}`}>Popular</NavLink>
            <NavLink to="/bestseller" className={`${classes.link}`}>Bestseller</NavLink>
            <NavLink to="/contact_us" className={`${classes.link}`}>Contact us</NavLink>
          </div>
          <div className={`${classes.catalog}`}>
            <h4 className={`${classes.title}`}> Catalog </h4>
            <NavLink to="/catalog" className={`${classes.link}`}>Fiction</NavLink>
            <NavLink to="/catalog" className={`${classes.link}`}>Mistic</NavLink>
            <NavLink to="/catalog" className={`${classes.link}`}>Non-Fiction</NavLink>
            <NavLink to="/catalog" className={`${classes.link}`}>Documental</NavLink>
            <NavLink to="/new" className={`${classes.link}`}>New</NavLink>
          </div>
          <div className={`${classes.catalog}`}>
            <h4 className={`${classes.title}`}> Contacts </h4>
            <div className={`${classes.contact}`}>
              <img src={location} alt="location" className={`${classes.address}`} />
              <p> California, USA </p>
            </div>
            <div className={`${classes.contact}`}>
              <img src={phone} alt="phone" className={`${classes.icon}`} />
              <p> +12012987481 </p>
            </div>
          </div>
          <div />
        </div>
        <div className={`${classes.social}`}>
          <div className={`${classes.media}`}>
            <p className={`${classes.information}`}> &copy; Logo 2023 </p>
            <Link to="https://twitter.com/" target="_blank">
              <img src={twitter} alt="facebook" className={`${classes.img}`} />
            </Link>
            <Link to="https://www.facebook.com/" target="_blank" className={`${classes.img}`}>
              <img src={facebook} alt="facebook" />
            </Link>
            <Link to="https://www.pinterest.com/" target="_blank" className={`${classes.img}`}>
              <img src={pinterest} alt="facebook" />
            </Link>
            <Link to="https://www.instagram.com/" target="_blank" className={`${classes.img}`}>
              <img src={instagram} alt="facebook" />
            </Link>
          </div>

          <div className={`${classes.media}`}>
            <Link to="/home">
              <img src={logo} alt="logo" className={`${classes.logo_img}`} />
            </Link>
          </div>
          <div className={`${classes.media}`}>
            <img src={payments} alt="payments" className={`${classes.payment_icon}`} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
