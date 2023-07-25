import React, { useCallback, useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import { CardActionArea } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import { Link, useSearchParams } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Api from '../Api';
import Wrapper from '../components/layout/Wrapper';
import Pagination from '../components/layout/Pagination';

function AuthorsList() {
  const [data, setData] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(1);
  const pageCount = Math.ceil(data.total / data.limit);

  useEffect(() => {
    (async () => {
      const { data } = await Api.getAuthors(page, 4);
      setData(data);
    })();
  }, [page]);

  const handlePageChange = useCallback(
    (ev) => {
      setSearchParams({ page: ev.selected + 1 });
      setPage(ev.selected + 1);
    },
    [searchParams, page],
  );

  return (
    <Wrapper>
      <div className="authors_list">
        <div className="container">
          <h4> Discover your favourite authors </h4>
          <div className="list">
            {data.authors ? data.authors.map((a) => (
              <Card sx={{ maxWidth: 345 }} className="card" key={a.id}>
                <Link to={`/authors/single/${a.id}`}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="140"
                      image={`http://localhost:4000/public/${a.avatar}`}
                      alt={a.fullName}
                      className="card_Media"
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
        </div>
      </div>
      <Pagination pageCount={pageCount} handlePageChange={handlePageChange} />
    </Wrapper>
  );
}

export default AuthorsList;
