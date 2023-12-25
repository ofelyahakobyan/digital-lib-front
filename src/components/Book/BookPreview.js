// noinspection BadExpressionStatementJS

import React, { useCallback, useEffect, useState } from 'react';
import {
  pdfjs, Document, Page, Thumbnail,
} from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import classes from './books.module.css';
import right from '../../assets/icons/right.png';
import left from '../../assets/icons/left.png';
import { getSingleBookRequest } from '../../store/actions/books';

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function BookPreview() {
  const { id } = useParams();
  const stripePromise = loadStripe('pk_test_51NaJjoHkPKk7KxBe89uCsxphPjJX99yVXMORwAKQhTNeHkB1H0xQqDNZYiJzWm7V4xAtsHhnx252KXGRovJJ8dBp00xVNNSoYG');
  const dispatch = useDispatch();
  const singleBook = useSelector((state) => state.books.singleBook);
  const [numPages, setNumPages] = useState(null);
  const token = localStorage.getItem('token');
  const [pageNumber, setPageNumber] = useState(1);
  useEffect(() => {
    (async () => {
      await dispatch(getSingleBookRequest({ bookId: id }));
    })();
  }, []);
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  function changePage(offset) {
    setPageNumber((prevPageNumber) => prevPageNumber + offset);
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }
  function onItemClick({ pageNumber: itemPageNumber }) {
    setPageNumber(itemPageNumber);
  }
  const onLoadError = useCallback((er) => {
    console.log(er);
  });
  const handleClick = useCallback(async () => {
    const data = await axios.post('http://localhost:4000/api/v1/orders/checkout-session', {
      books: [id],
    }, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    (await stripePromise).redirectToCheckout({ sessionId: data.data.sessionId });
  }, []);

  return (
    <div className={`${classes.document}`}>
      {singleBook ? (
        <Document
          file={`http://localhost:4000/${singleBook?.bookFiles?.previewPDF}`}
                /* eslint-disable-next-line react/jsx-no-bind */
          onLoadSuccess={onDocumentLoadSuccess}
          onContextMenu={(e) => e.preventDefault()}
                /* eslint-disable-next-line react/jsx-no-bind */
          onItemClick={onItemClick}
          className={`${classes.pdf}`}
          onLoadError={onLoadError}
        >
          <div className={`${classes.thumbnails}`}>
            {Array.from(new Array(numPages), (el, index) => (
              <Thumbnail
                key={`thumbnail_${index + 1}`}
                pageNumber={index + 1}
                width={100}
                className={`${classes.thumbnail}`}
              />
            ))}
          </div>
          <div className={`${classes.books}`}>
            <div className={`${classes.control}`}>
              <button
                type="button"
                disabled={pageNumber <= 1}
                onClick={previousPage}
                className={`${classes.button}`}
              >
                <img src={left} alt="icon" className={`${classes.img}`} />
              </button>
              <Page
                pageNumber={pageNumber}
                height={600}
                className={`${classes.book}`}
              />
              <button
                type="button"
                disabled={pageNumber >= numPages}
                onClick={nextPage}
                className={`${classes.button}`}
              >
                <img src={right} alt="icon" className={`${classes.img}`} />
              </button>
            </div>
            <span>
              Page
              {' '}
              {pageNumber || (numPages ? 1 : '--')}
              {' '}
              of
              {' '}
              {numPages || '--'}
            </span>
          </div>
        </Document>
      ) : null }
      {numPages < 2 ? <button type="button" className={token ? `${classes.button_buy}` : `${classes.disabled}`} onClick={handleClick} disabled={!token}> Continue</button> : null}
    </div>
  );
}

export default BookPreview;
