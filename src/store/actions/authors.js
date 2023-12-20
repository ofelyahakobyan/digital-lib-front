import { createAsyncThunk } from '@reduxjs/toolkit';
import Api from '../../Api';

export const getAuthorsRequest = createAsyncThunk('users/getAuthorsRequest', async (payload, thunkAPI) => {
  try {
    const { page, limit } = payload;
    const { data } = await Api.getAuthors(page, limit);
    return data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response.data);
  }
});
export const getSingleAuthorRequest = createAsyncThunk('users/getSingleAuthorRequest', async (payload, thunkAPI) => {
  try {
    const { authorId } = payload;
    const { data } = await Api.getSingleAuthor(authorId);
    return data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response.data);
  }
});
