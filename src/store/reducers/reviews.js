import { createReducer } from '@reduxjs/toolkit';
import {
  deleteReview, editReview, getReviews, getUserReviewsRequest, postReview,
} from '../actions/reviews';

const initialState = {
  review: [],
  errors: {},
  reviews: {},
  userReviews: {},
};
export default createReducer(initialState, (builder) => {
  builder
    .addCase(postReview.fulfilled, (state, action) => {
      state.review.push(action.payload.review);
    })
    .addCase(editReview.fulfilled, (state, action) => {
      state.review = action.payload.review;
    })
    .addCase(editReview.rejected, (state, action) => {
      state.errors = action.payload.errors;
    })
    .addCase(deleteReview.fulfilled, () => {
      console.log();
    })
    .addCase(getReviews.fulfilled, (state, action) => {
      state.reviews = action.payload;
    })
    .addCase(getUserReviewsRequest.fulfilled, (state, action) => {
      state.userReviews = action.payload;
    });
});
