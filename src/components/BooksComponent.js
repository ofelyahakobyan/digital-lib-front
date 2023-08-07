import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Api from '../Api';
import SingleInfo from './SingleInfo';

function BooksComponent(props) {
  const { id, title } = props;
  const [books, setBooks] = useState([]);
  useEffect(() => {
    (async () => {
      const { data } = await Api.getBooksByCategoryForHomePage(id);
      setBooks(data.books);
    })();
  }, []);
  const finalTitle = title.toUpperCase();
  return (
    <div className="books_component">
      <div className="container">
        <h4>
          {' '}
          {finalTitle}
          {' '}
        </h4>
        <div className="list">
          {books ? books.map((b) => (
            <SingleInfo data={b} link="/books/single" name={`${b.title}`} key={b.id} />
          )) : null}
        </div>
      </div>
    </div>
  );
}

BooksComponent.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
};

export default BooksComponent;
