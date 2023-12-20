import { createAsyncThunk } from '@reduxjs/toolkit';
import Api from '../../Api';

export const postReview = createAsyncThunk('reviews/postReview', async (payload, thunkAPI) => {
  try {
    const {
      bookId, title, content, rating,
    } = payload;
    const { data } = await Api.postBookReview(bookId, title, content, rating);
    return data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response.data);
  }
});

export const editReview = createAsyncThunk('reviews/editReview', async (payload, thunkAPI) => {
  try {
    const {
      reviewId, title, content, rating,
    } = payload;
    const { data } = await Api.patchBookReviewEdit(reviewId, title, content, rating);
    return data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response.data);
  }
});
export const deleteReview = createAsyncThunk('reviews/deleteReview', async (payload, thunkAPI) => {
  try {
    const { reviewId } = payload;
    const { data } = await Api.deleteBookReview(reviewId);
    return data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response.data);
  }
});
export const getReviews = createAsyncThunk('reviews/getUserReviews', async (payload, thunkAPI) => {
  try {
    const { bookId } = payload;
    const { data } = await Api.getBookReviews(bookId);
    return data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response.data);
  }
});
export const getUserReviewsRequest = createAsyncThunk('reviews/getUserReviewsRequest', async (payload, thunkAPI) => {
  try {
    const { userID } = payload;
    const { data } = await Api.getUserReviews(userID);
    console.log(data);
    return data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response.data);
  }
});
