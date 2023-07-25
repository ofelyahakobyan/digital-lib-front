import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Card from '@mui/material/Card';
import { CardActionArea } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import Api from '../Api';
import Wrapper from '../components/layout/Wrapper';

function SingleAuthor() {
  const { id } = useParams();
  const [author, setAuthor] = useState([]);
  useEffect(() => {
    (async () => {
      const { data } = await Api.getSingleAuthor(id);
      setAuthor(data.author);
    })();
  }, [id]);

  console.log(author);
  return (
    <Wrapper>
      <div className="single_author">
        <div className="container">
          <Card sx={{ maxWidth: 345 }} className="card" key={author.id}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image={`http://localhost:4000/public/${author.avatar}`}
                alt={author.fullName}
              />
            </CardActionArea>
          </Card>
          <div>
            <h4>
              {' '}
              {author.fullName}
            </h4>
            <p>
              {' '}
              {author.bio}
            </p>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

export default SingleAuthor;
