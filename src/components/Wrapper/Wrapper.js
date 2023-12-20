import React from 'react';
import PropTypes from 'prop-types';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Subscribe from '../Subscripton/Subscribe';

function Wrapper(props) {
  const { children } = props;
  return (
    <div className="wrapper">
      <Header />
      {children}
      <Subscribe />
      <Footer />
    </div>
  );
}
Wrapper.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  children: PropTypes.any,
};
Wrapper.defaultProps = {
  // eslint-disable-next-line react/forbid-prop-types
  children: PropTypes.any,
};
export default Wrapper;
