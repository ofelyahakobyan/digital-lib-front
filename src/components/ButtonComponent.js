import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';

function ButtonComponent(props) {
  const {
    buttonName, size, color, link,
  } = props;
  const theme = createTheme({
    palette: {
      primary: {
        main: '#8C4C27',
        contrastText: '#fff',
      },
      secondary: {
        main: '#BF9775',
        contrastText: '#fff',
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <Button variant="contained" href={link} color={color} size={size}>{buttonName}</Button>
    </ThemeProvider>
  );
}
ButtonComponent.propTypes = {
  buttonName: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};
export default ButtonComponent;
