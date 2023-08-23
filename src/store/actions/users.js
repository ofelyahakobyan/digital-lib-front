import { createAsyncThunk, createAction } from '@reduxjs/toolkit';
import Api from '../../Api';

export const loginRequest = createAsyncThunk('users/loginRequest', async (payload, thunkAPI) => {
  try {
    const { email, password } = payload;
    const { data } = await Api.userLogin(email, password);
    return data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response.data);
  }
});

export const registerRequest = createAsyncThunk('users/registerRequest', async (payload, thunkAPI) => {
  try {
    const {
      firstName, lastName, email, password,
    } = payload;
    const { data } = await Api.userRegistration(firstName, lastName, email, password);
    return data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response.data);
  }
});

export const forgotPasswordRequest = createAsyncThunk('users/forgotPasswordRequest', async (payload, thunkAPI) => {
  try {
    const { email } = payload;
    const { data } = await Api.userForgotPassword(email);
    return data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response.data);
  }
});
export const resetPasswordRequest = createAsyncThunk('users/resetPasswordRequest', async (payload, thunkAPI) => {
  try {
    const { code, email, newPassword } = payload;
    const { data } = await Api.userResetPassword(code, email, newPassword);
    return data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response.data);
  }
});
export const logOut = createAction('users/logOut');
