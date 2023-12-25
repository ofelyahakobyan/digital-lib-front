import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useSearchParams } from 'react-router-dom';
import classes from './profile.module.css';
import UserNavigation from './UserNavigation';
import Wrapper from '../../components/Wrapper/Wrapper';
import Pagination from '../../components/Pagination/Pagination';

function UserBooks() {
  const token = localStorage.getItem('token');
  const [buyedBooks, setBuyedBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState();
  const [searchParams, setSearchParams] = useSearchParams();
  const handlePageChange = useCallback((ev) => {
    setPage(ev.selected + 1);
    searchParams.set('page', ev.selected + 1);
    setSearchParams(searchParams);
  }, [page, searchParams]);
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          'http://localhost:4000/api/v1/user/library',
          {
            headers: {
              authorization: token,
            },
          },
        );
        setBuyedBooks(data.items);
        setPageCount(data.totalPages);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);
  console.log(buyedBooks);
  return (
    <Wrapper>
      <div className={`${classes.personal_info}`}>
        <UserNavigation />
        <div>
          <h1 className={`${classes.title}`}>My Books</h1>
          {/* eslint-disable-next-line max-len */}
          <p className={`${classes.info_text}`}>
            The information you provide helps us enhance your user experience, tailor our services
            to your needs, and ensure the seamless functioning of our platform.
          </p>
          {buyedBooks ? buyedBooks.map((b) => (
            <div key={b.id} className={`${classes.personal_info}`}>
              <img src={`http://localhost:4000/${b.bookFiles.coverS}`} alt="cover" />
              <div className={`${classes.book_info}`}>
                <Link to={`/books/single/${b.id}`} className={`${classes.book_title}`}>
                  <h3 className={`${classes.book_title}`}>
                    {' '}
                    {b.title}
                  </h3>
                </Link>

                <p className={`${classes.book_desc}`}>
                  {' '}
                  {b.description}
                </p>
                <Link to={`/books/single/${b.id}/book-full`} className={`${classes.book_button}`}>READ</Link>
                {b.audio ? <Link to={`/books/audio/${b.id}`} className={`${classes.listen_button}`}>Listen</Link> : null}
              </div>
            </div>
          )) : null}
        </div>
      </div>
      {buyedBooks.length > 8
        ? (
          <Pagination
            pageCount={pageCount}
            handlePageChange={handlePageChange}
          />
        ) : null}
    </Wrapper>
  );
}

export default UserBooks;
