import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import Footer from './Footer';

function Wrapper(props) {
  const { children } = props;
  return (
    <div className="wrapper">
      <Header />
      {children}
      <Footer />
    </div>
  );
}
Wrapper.propTypes = {
  children: PropTypes.element.isRequired,
};
export default Wrapper;
