import React, { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Api from '../Api';
import Wrapper from '../components/layout/Wrapper';
import Pagination from '../components/layout/Pagination';
import SingleInfo from '../components/SingleInfo';

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
              <SingleInfo data={a} link="/authors/single" name={`${a.fullName}`} />
            )) : null}
          </div>
        </div>
      </div>
      <Pagination pageCount={pageCount} handlePageChange={handlePageChange} />
    </Wrapper>
  );
}

export default AuthorsList;
