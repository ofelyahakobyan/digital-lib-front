import { createAsyncThunk } from '@reduxjs/toolkit';
import Api from '../../Api';

export const getBooksByCategory = createAsyncThunk('books/getBooksByCategory', async (payload, thunkAPI) => {
  try {
    const { categoryId, page, limit } = payload;
    const { data } = await Api.getBooksByCategory(categoryId, page, limit);
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});
export const getCategoriesListRequest = createAsyncThunk('categories/getCategoriesListRequest', async (payload, thunkAPI) => {
  try {
    const { data } = await Api.getCategoriesList();
    return data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response.data);
  }
});
