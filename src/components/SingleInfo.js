import React from 'react';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import { CardActionArea } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import { Link } from 'react-router-dom';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

function SingleInfo(props) {
  const { data, link, name } = props;
  return (
    <Card sx={{ maxWidth: 345 }} className="card">
      <Link to={`${link}/${data.id}`}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="200px"
            image={`http://localhost:4000/${data.avatar}`}
            alt={data.firstName}
            className="card_Media"
          />
          <CardContent>
            <Typography gutterBottom variant="h6" component="div">
              {name}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Link>
    </Card>
  );
}
SingleInfo.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.object.isRequired,
  link: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default SingleInfo;
