import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import Search from '../../components/Search/Search';
import Wrapper from '../../components/Wrapper/Wrapper';
import classes from '../Catalog/catalog.module.css';
import BookInfo from '../../components/BookInfo/BookInfo';
import Pagination from '../../components/Pagination/Pagination';
import { getBooksRequest } from '../../store/actions/books';
// import Pagination from '../../components/Pagination/Pagination';

function New() {
  const dispatch = useDispatch();
  const books = useSelector((state) => state.books.books);
  const info = useSelector((state) => state.books.info);
  const [page, setPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const pageCount = info.totalPages;
  const handlePageChange = useCallback((ev) => {
    setPage(ev.selected + 1);
    setSearchParams({ page: ev.selected + 1 });
  }, [page, searchParams]);
  useEffect(() => {
    (async () => {
      const authorIds = searchParams.get('author_ids')?.split(',');
      const minPrice = searchParams.get('minPrice');
      const maxPrice = searchParams.get('maxPrice');
      const catsIds = searchParams.get('category_ids')?.split(',');
      const popular = searchParams.get('popular');
      const rating = searchParams.get('rating');
      const languages = searchParams.get('languages')?.split(',');
      const q = searchParams.get('q');
      await dispatch(getBooksRequest({
        page: searchParams.get('page') || 1,
        limit: 8,
        categoryIds: catsIds,
        authorIds,
        minPrice,
        maxPrice,
        popular,
        brandNew: true,
        rating,
        languages,
        q,
      }));
    })();
  }, [searchParams]);
  return (
    <Wrapper>
      <div className={`${classes.catalog}`}>
        <h1 className={`${classes.title}`}> New books </h1>
        <h3 className={`${classes.title_second}`}> Categories </h3>
        <h2 className={`${classes.books_title}`}>
          {books.length === 0 ? 'Books not found' : null}
        </h2>
        <div className={`${classes.main}`}>
          <div className={`${classes.search}`}>
            <Search />
          </div>
          <div className={`${classes.books}`}>
            {books ? books.map((b) => (
              <BookInfo data={b} link="/books/single" name={`${b.title}`} key={b.id} icon="full" />
            )) : null}
          </div>
        </div>
      </div>
      {info.total > 9
        ? <Pagination pageCount={pageCount} handlePageChange={handlePageChange} />
        : null}
    </Wrapper>
  );
}

export default New;
