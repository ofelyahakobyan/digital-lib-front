import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleBookRequest } from '../../store/actions/books';
import Wrapper from '../../components/Wrapper/Wrapper';
import classes from './audio.module.css';

function Audio() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [url, setUrl] = useState('');
  const token = localStorage.getItem('token');
  const singleBook = useSelector((state) => state.books.singleBook);

  useEffect(() => {
    (async () => {
      if (id) {
        dispatch(getSingleBookRequest({ bookId: id }));
      }
    })();
  }, [id]);
  console.log(singleBook);
  const fetchData = useCallback(async () => {
    try {
      if (id) {
        const res = await axios.get(
          `http://localhost:4000/api/v1/books/${id}/audio`,
          {
            headers: {
              authorization: token,
            },
            responseType: 'arraybuffer',
          },
        );
        if (res.data) {
          const blob = new Blob([res.data], { type: 'audio/mpeg' });
          setUrl(URL.createObjectURL(blob));
        }
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  return (
    <Wrapper>
      <div className={`${classes.audio}`}>
        <img
          src={`http://localhost:4000/${singleBook?.bookFiles?.coverS}`}
          alt="cover"
        />
        <div className={`${classes.info}`}>
          <h2 className={`${classes.title}`}>
            {' '}
            {singleBook.title}
          </h2>
          <Link to={`/authors/single/${singleBook?.author?.id}`} className={`${classes.link_info}`}>
            {' '}
            by
            {' '}
            {singleBook?.author?.fullName}
          </Link>
          <p className={`${classes.book_desc}`}>
            {' '}
            {singleBook.description}
            {' '}
          </p>
          <div>
            <button type="button" onClick={fetchData} className={`${classes.start_button}`}>Click here to start enjoying your listening... </button>
            {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
            <audio style={{ width: '92%' }} src={url} controls />
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

export default Audio;
