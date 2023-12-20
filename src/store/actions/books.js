import { createAsyncThunk } from '@reduxjs/toolkit';
import Api from '../../Api';

export const getBooksRequest = createAsyncThunk('books/getBooksRequest', async (payload, thunkAPI) => {
  try {
    const { data } = await Api.getBooks(payload);
    return data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response.data);
  }
});

export const getBooksByCatsForHome = createAsyncThunk('books/getBooksByCatsForHome', async (payload, thunkAPI) => {
  try {
    const { categoryId, page, limit } = payload;
    const { data } = await Api.getBooksByCategoryForHomePage(categoryId, page, limit);
    return data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response.data);
  }
});
export const getAuthorsBooks = createAsyncThunk('books/getAuthorsBooks', async (payload, thunkAPI) => {
  try {
    const { bookId, page, limit } = payload;
    const { data } = await Api.getAuthorsBooks(bookId, page, limit);
    return data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response.data);
  }
});
export const getSingleBookRequest = createAsyncThunk('books/getSingleBookRequest', async (payload, thunkAPI) => {
  try {
    const { bookId } = payload;
    const { data } = await Api.getSingleBook(bookId);
    return data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response.data);
  }
});
export const getBookReviewsReq = createAsyncThunk('books/getBookReviewsReq', async (payload, thunkAPI) => {
  try {
    const { id } = payload;
    const { data } = await Api.getBookReviews(id);
    return data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response.data);
  }
});
