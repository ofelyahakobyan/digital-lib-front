import React from 'react';
import PropTypes from 'prop-types';

function Button(props) {
  const { buttonName = 'button' } = props;
  return (
    <button type="button" className="button">
      {buttonName}
    </button>
  );
}
Button.propTypes = {
  buttonName: PropTypes.string.isRequired,
};

export default Button;
