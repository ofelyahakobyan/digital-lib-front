import React, { useCallback, useState } from 'react';
import {
  pdfjs, Document, Page, Outline, Thumbnail,
} from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import classes from './books.module.css';
import right from '../../assets/icons/right.png';
import left from '../../assets/icons/left.png';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

function Book() {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

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
    console.log(pageNumber);
  }
  function onItemClick({ pageNumber: itemPageNumber }) {
    setPageNumber(itemPageNumber);
  }
  function highlightPattern(text, pattern) {
    return text.replace(pattern, (value) => `<mark>${value}</mark>`);
  }
  const [searchText, setSearchText] = useState('');

  const textRenderer = useCallback(
    (textItem) => highlightPattern(textItem.str, searchText),
    [searchText],
  );

  function onChange(event) {
    setSearchText(event.target.value);
  }

  return (
    <div className={`${classes.document}`}>
      <div className={`${classes.control}`}>
        <button
          type="button"
          disabled={pageNumber <= 1}
          onClick={previousPage}
          className={`${classes.button}`}
        >
          <img src={left} alt="icon" className={`${classes.img}`} />
        </button>
        <span>
          Page
          {' '}
          {pageNumber || (numPages ? 1 : '--')}
          {' '}
          of
          {' '}
          {numPages || '--'}
        </span>
        <button
          type="button"
          disabled={pageNumber >= numPages}
          onClick={nextPage}
          className={`${classes.button}`}
        >
          <img src={right} alt="icon" className={`${classes.img}`} />
        </button>
      </div>
      <div>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label htmlFor="search">Search:</label>
        <input type="search" id="search" value={searchText} onChange={onChange} />
      </div>
      <Document
        file="document.pdf"
                /* eslint-disable-next-line react/jsx-no-bind */
        onLoadSuccess={onDocumentLoadSuccess}
        onContextMenu={(e) => e.preventDefault()}
                /* eslint-disable-next-line react/jsx-no-bind */
        onItemClick={onItemClick}
      >
        {/* eslint-disable-next-line react/jsx-no-bind */}
        <Page
          pageNumber={pageNumber}
          height={550}
          customTextRenderer={textRenderer}
        />
        {/* {Array.from(new Array(numPages), (el, index) => (
            <Page
              key={`page_${index + 1}`}
              inputRef={
                              pageNumber === index + 1 ? (ref) => ref && ref.scrollIntoView() : null
                          }
              pageNumber={index + 1}
              customTextRenderer={textRenderer}
              height={530}
            />
          ))} */}
        /*
        {' '}
        {/*  <button type="button" onClick={handleAddScale} className={`${classes.button_zoom}`}> +</button> */}
        {' '}
        */
        {/* <button type="button" onClick={handleDecreaseScale} className={`${classes.button_zoom}`}> -</button> */}
        <Thumbnail />
        <Outline />
      </Document>

    </div>
  );
}

export default Book;
