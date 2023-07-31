import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Api from '../Api';
import Wrapper from '../components/layout/Wrapper';
import SingleInfo from '../components/SingleInfo';

function SingleAuthor() {
  const { id } = useParams();
  const [author, setAuthor] = useState([]);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await Api.getSingleAuthor(id);
      setAuthor(data.author);
    })();
  }, [id]);
  useEffect(() => {
    (async () => {
      const { data } = await Api.getAuthorsBooks(id);
      setBooks(data.books);
    })();
  }, [id]);

  return (
    <Wrapper>
      <div className="single_author">
        <div className="container">
          <SingleInfo data={author} link="/authors/single" name={author.fullName} />
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
      <div className="books">
        <div className="container">
          {books ? books.map((b) => (
            <SingleInfo data={b} link="/books/single" name={b.title} />
          )) : null}
        </div>
      </div>
    </Wrapper>
  );
}

export default SingleAuthor;
