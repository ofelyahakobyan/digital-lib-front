import { createReducer } from '@reduxjs/toolkit';
import { getAuthorsRequest, getSingleAuthorRequest } from '../actions/authors';

const initialState = {
  authorsInfo: {},
  authors: [],
  author: {},

};
export default createReducer(initialState, (builder) => {
  builder
    .addCase(getAuthorsRequest.fulfilled, (state, action) => {
      state.authors = action.payload.authors;
      state.authorsInfo = action.payload;
    })
    .addCase(getSingleAuthorRequest.fulfilled, (state, action) => {
      state.author = action.payload.author;
      console.log(action.payload);
    });
});
