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

export const changePasswordRequest = createAsyncThunk('users/changePasswordRequest', async (payload, thunkAPI) => {
  try {
    const { currentPassword, newPassword } = payload;
    const { data } = await Api.userChangePassword(currentPassword, newPassword);
    return data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response.data);
  }
});
export const userProfileRequest = createAsyncThunk('users/userProfileRequest', async (payload, thunkAPI) => {
  try {
    const { data } = await Api.getUserProfile();
    return data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response.data);
  }
});
export const userEditProfileRequest = createAsyncThunk('users/userEditProfileRequest', async (payload, thunkAPI) => {
  try {
    const {
      firstName, lastName, phone, nikName, country, dob, shortAbout,
    } = payload;
    // eslint-disable-next-line max-len
    const { data } = await Api.editProfile(firstName, lastName, phone, nikName, country, dob, shortAbout);
    return data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response.data);
  }
});
export const userWishListRequest = createAsyncThunk('users/userWishListRequest', async (payload, thunkAPI) => {
  try {
    const { data } = await Api.getUserWishList(payload);
    return data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response.data);
  }
});
export const userWishListAddRequest = createAsyncThunk('users/userWishListAddRequest', async (payload, thunkAPI) => {
  try {
    const { bookId } = payload;
    const { data } = await Api.postUserWishList(bookId);
    console.log(payload);
    return data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response.data);
  }
});
export const userWishListDeleteRequest = createAsyncThunk('users/userWishListDeleteRequest', async (payload, thunkAPI) => {
  try {
    const { bookId } = payload;
    const { data } = await Api.deleteUserWishList(bookId);
    console.log(payload);
    return data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response.data);
  }
});
export const userCardRequest = createAsyncThunk('users/userCardRequest', async (payload, thunkAPI) => {
  try {
    const { data } = await Api.getUserCard(payload);
    return data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response.data);
  }
});
export const userCardAddRequest = createAsyncThunk('users/userCardAddRequest', async (payload, thunkAPI) => {
  try {
    const { bookId } = payload;
    const { data } = await Api.postUserCard(bookId);
    console.log(payload);
    return data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response.data);
  }
});
export const userCardDeleteRequest = createAsyncThunk('users/userCardDeleteRequest', async (payload, thunkAPI) => {
  try {
    const { bookId } = payload;
    const { data } = await Api.deleteUserCard(bookId);
    console.log(payload);
    return data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response.data);
  }
});
export const logOut = createAction('users/logOut');
