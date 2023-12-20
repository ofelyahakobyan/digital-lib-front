import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAuthorsRequest } from '../../store/actions/authors';
import BookInfo from '../BookInfo/BookInfo';
import classes from './authors.module.css';

function Authors() {
  const dispatch = useDispatch();
  const authors = useSelector((state) => state.authors.authors);

  useEffect(() => {
    (async () => {
      await dispatch(getAuthorsRequest(1, 4));
    })();
  }, []);
  console.log(authors);
  return (
    <div className={`${classes.authors}`}>
      <div className={`${classes.container}`}>
        <h4 className={`${classes.title}`}> Authors of books </h4>
        <div className={`${classes.list}`}>
          {authors ? authors.map((a) => (
            <BookInfo data={a} link="/authors/single" name={`${a.fullName}`} key={a.id} className="authors_info" />
          )) : null}
        </div>
        <Link to="/authors" className={`${classes.button}`}> See More </Link>
      </div>
    </div>
  );
}

export default Authors;
