import { createReducer } from '@reduxjs/toolkit';
import { getBooksByCategory, getCategoriesListRequest } from '../actions/categories';

const initialState = {
  categories: [],
  booksByCategory: {},

};

export default createReducer(initialState, (builder) => {
  builder
    .addCase(getCategoriesListRequest.fulfilled, (state, action) => {
      const { categories } = action.payload;
      state.categories = categories;
    })
    .addCase(getBooksByCategory.fulfilled, (state, action) => {
      state.booksByCategory = action.payload;
    });
});
