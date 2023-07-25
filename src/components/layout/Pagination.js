import React from 'react';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';

function Pagination(props) {
  const { pageCount, handlePageChange } = props;

  return (
    <ReactPaginate
      pageCount={pageCount}
      pageRangeDisplayed={6}
      onPageChange={handlePageChange}
      breakLabel="..."
      nextLabel="next"
      previousLabel="previous"
      renderOnZeroPageCount={null}
      previousClassName="previousBtn"
      nextClassName="nextBtn"
      containerClassName="paginateBtns"
      activeClassName="activeBtn"
    />
  );
}
Pagination.propTypes = {
  pageCount: PropTypes.number.isRequired,
  handlePageChange: PropTypes.func.isRequired,
};
export default Pagination;
