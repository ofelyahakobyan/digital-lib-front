import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useSearchParams } from 'react-router-dom';
import { getBooksByCategory } from '../../store/actions/categories';
import Wrapper from '../../components/Wrapper/Wrapper';
import BookInfo from '../../components/BookInfo/BookInfo';
import classes from '../../components/BooksListComponent/bookslistcomponent.module.css';
import Pagination from '../../components/Pagination/Pagination';

function BooksByCategory() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const books = useSelector((state) => state.categories.booksByCategory);
  const [searchParams, setSearchParams] = useSearchParams({ page: 1 });
  const [page, setPage] = useState(1);
  const pageCount = books.totalPages;
  useEffect(() => {
    (async () => {
      if (id) {
        await dispatch(getBooksByCategory({ categoryId: +id, page: searchParams.get('page') }));
      }
    })();
  }, [searchParams]);
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
            {books.total}
            {' '}
            books
          </h4>
          <div className={`${classes.list}`}>
            {books.books ? books.books.map((b) => (
              <BookInfo data={b} link="/books/single" name={`${b.title}`} key={b.id} icon="full" />
            )) : null}

          </div>
        </div>
      </div>
      {books.total > 4
        ? <Pagination pageCount={pageCount} handlePageChange={handlePageChange} />
        : null}
    </Wrapper>
  );
}

export default BooksByCategory;
