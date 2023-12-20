import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { getAuthorsRequest } from '../../store/actions/authors';
import classes from './authors.module.css';
import BookInfo from '../../components/BookInfo/BookInfo';
import Pagination from '../../components/Pagination/Pagination';
import Wrapper from '../../components/Wrapper/Wrapper';

function Authors() {
  const dispatch = useDispatch();
  const authors = useSelector((state) => state.authors.authors);
  const authorsInfo = useSelector((state) => state.authors.authorsInfo);
  const [searchParams, setSearchParams] = useSearchParams({ page: 1 });
  const [page, setPage] = useState(1);
  const pageCount = authorsInfo.totalPages;
  useEffect(() => {
    (async () => {
      await dispatch(getAuthorsRequest({ page: searchParams.get('page') }));
    })();
  }, [searchParams, page]);
  const handlePageChange = useCallback((ev) => {
    setPage(ev.selected + 1);
    setSearchParams({ page: ev.selected + 1 });
  }, [page, searchParams]);
  return (
    <Wrapper>
      <div className={`${classes.books}`}>
        <div className={`${classes.container}`}>
          <h4 className={`${classes.title}`}>
            Total:
            {' '}
            {' '}
            {authorsInfo.total}
            {' '}
            authors
          </h4>
          <div className={`${classes.list}`}>
            {authors ? authors.map((a) => (
              <BookInfo data={a} link="/authors/single" name={`${a.fullName}`} key={a.id} />
            )) : null}

          </div>
        </div>
      </div>
      {authorsInfo.total > 4
        ? <Pagination pageCount={pageCount} handlePageChange={handlePageChange} />
        : null}
    </Wrapper>
  );
}

export default Authors;
