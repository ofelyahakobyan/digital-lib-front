import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getBooksByCatsForHome } from '../../store/actions/books';
import BookInfo from '../BookInfo/BookInfo';
import classes from './bookslistcomponent.module.css';

function BooksListComponent(props) {
  const { id, title } = props;
  const dispatch = useDispatch();
  const [books, setBooks] = useState([]);
  // const booksByCategories = useSelector((state) => state.books.booksByCategories);
  useEffect(() => {
    (async () => {
      const { payload } = await dispatch(getBooksByCatsForHome({ categoryId: id }));
      setBooks(payload.books);
    })();
  }, []);
  const finalTitle = title.toUpperCase();
  return (
    <div className={`${classes.books}`}>
      {books.length ? (
        <div className={`${classes.container}`}>
          <h4 className={`${classes.title}`}>
            {' '}
            {finalTitle}
            {' '}
          </h4>
          <div className={`${classes.list}`}>
            {books ? books.map((b) => (
              <BookInfo data={b} link="/books/single" name={`${b.title}`} key={b.id} icon="full" />
            )) : null}
          </div>
          <Link to={`/books/category/${id}`} className={`${classes.button}`}> See all </Link>
        </div>
      ) : null}
    </div>
  );
}

BooksListComponent.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
};

export default BooksListComponent;
