import React, { useState } from 'react';
import { Rating } from '@mui/material';
import Typography from '@mui/material/Typography';

function RatingComponent() {
  const [value, setValue] = useState(0);
  console.log(value);
  return (
    <div>
      <Typography component="legend" />
      <Rating
        name="simple-controlled"
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      />
    </div>
  );
}

export default RatingComponent;
