import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import { CardActionArea } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import { Link } from 'react-router-dom';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import RatingComponent from './RatingComponent';
import Api from '../Api';

function SingleInfo(props) {
  const { data, link, name } = props;
  const [reviews, setReviews] = useState({});
  useEffect(() => {
    (async () => {
      const info = await Api.getBookReviews(data.id);
      setReviews(info.data.total);
    })();
  }, []);
  return (
    <Card sx={{ maxWidth: 345 }} className="card">
      <CardActionArea>
        <Link to={`${link}/${data.id}`}>
          <CardMedia
            component="img"
            height="230px"
            image={`http://localhost:4000/${data.avatar}`}
            alt={data.firstName}
            className="card_Media"
          />
        </Link>
        <CardContent>
          <Typography gutterBottom variant="h7" component="div">
            <p className="price">
              {' '}
              {data.price ? `$ ${data.price}` : null}
              {' '}
            </p>
            <br />
            <p className="name">
              {' '}
              {name}
              {' '}
            </p>
            <br />
            <p className="author">
              {' '}
              {data.author ? `${data.author.fullName}` : null}
              {' '}
            </p>
            <div className="rating">
              {data.price ? <RatingComponent /> : null }
              {reviews > 0 ? `${reviews} reviews` : null}
            </div>
          </Typography>
        </CardContent>
      </CardActionArea>
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
