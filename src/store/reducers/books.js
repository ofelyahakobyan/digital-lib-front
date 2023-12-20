import { createReducer } from '@reduxjs/toolkit';
// eslint-disable-next-line import/named
import {
  getAuthorsBooks, getBookReviewsReq, getBooksByCatsForHome, getBooksRequest, getSingleBookRequest,
} from '../actions/books';

const initialState = {
  books: [],
  info: {},
  booksByCategories: [],
  authorsBooks: [],
  singleBook: {},
  reviews: [],
  reviewsInfo: {},
};
export default createReducer(initialState, (builder) => {
  builder
    .addCase(getBooksRequest.fulfilled, (state, action) => {
      state.books = action.payload.books;
      state.info = action.payload;
    })
    .addCase(getBooksByCatsForHome.fulfilled, (state, action) => {
      state.booksByCategories = action.payload.books;
    })
    .addCase(getAuthorsBooks.fulfilled, (state, action) => {
      state.authorsBooks = action.payload.books;
    })
    .addCase(getSingleBookRequest.fulfilled, (state, action) => {
      state.singleBook = action.payload.book;
    })
    .addCase(getBookReviewsReq.fulfilled, (state, action) => {
      state.reviews = action.payload.reviews;
      state.reviewsInfo = action.payload;
    });
});
