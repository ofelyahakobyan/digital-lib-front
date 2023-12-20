import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Wrapper from '../../components/Wrapper/Wrapper';
import { getSingleAuthorRequest } from '../../store/actions/authors';
import { getAuthorsBooks } from '../../store/actions/books';
import BookInfo from '../../components/BookInfo/BookInfo';
import classes from './singleauthor.module.css';

function SingleAuthor() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const author = useSelector((state) => state.authors.author);
  const books = useSelector((state) => state.books.authorsBooks);
  useEffect(() => {
    (async () => {
      if (id) {
        dispatch(getSingleAuthorRequest({ authorId: id }));
      }
    })();
  }, [id]);
  useEffect(() => {
    (async () => {
      if (id) {
        dispatch(getAuthorsBooks({ bookId: id }));
      }
    })();
  }, [id]);

  return (
    <Wrapper>
      <div className={`${classes.single_author}`}>
        <div className={`${classes.container}`}>
          {author ? (
            <BookInfo
              data={author}
              link="/authors/single"
              name={author.fullName}
            />
          ) : null}
          <div className={`${classes.info}`}>
            <h4 className={`${classes.title}`}>{author.fullName}</h4>
            <p>{author.bio}</p>
          </div>
        </div>
        <h4 className={`${classes.title}`}> Author&apos;s books </h4>
        <div className={`${classes.books}`}>
          {books
            ? books.map((b) => (
              <BookInfo data={b} link="/books/single" name={b.title} key={b.id} />
            ))
            : null}
        </div>
      </div>

    </Wrapper>
  );
}

export default SingleAuthor;
