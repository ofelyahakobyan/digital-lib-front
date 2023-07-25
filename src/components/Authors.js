import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { Link } from 'react-router-dom';
import ButtonComponent from './ButtonComponent';
import Api from '../Api';

function Authors() {
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await Api.getAuthors();
      setAuthors(data.authors);
    })();
  }, []);

  return (
    <div className="authors">
      <div className="container">
        <h4> Authors of books </h4>
        <div className="list">
          {authors ? authors.map((a) => (
            <Card sx={{ maxWidth: 345 }} className="card" key={a.id}>
              <Link to={`/authors/single/${a.id}`}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    image={`http://localhost:4000/public/${a.avatar}`}
                    alt={a.fullName}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                      {a.fullName}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Link>
            </Card>
          )) : null}
        </div>
        <div className="button_container">
          <ButtonComponent
            buttonName="see more"
            color="secondary"
            size="large"
            link="/authors"
          />
        </div>
      </div>
    </div>
  );
}

export default Authors;
