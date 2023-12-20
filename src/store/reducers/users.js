import { createReducer } from '@reduxjs/toolkit';

import {
  changePasswordRequest,
  forgotPasswordRequest,
  loginRequest,
  logOut,
  registerRequest,
  resetPasswordRequest, userCardAddRequest, userCardDeleteRequest, userCardRequest,
  userEditProfileRequest,
  userProfileRequest, userWishListAddRequest, userWishListDeleteRequest, userWishListRequest,
} from '../actions/users';

const initialState = {
  token: localStorage.getItem('token') || '',
  profile: {},
  errors: {},
  users: [],
  message: '',
  wishlist: [],
  card: [],
  error: '',
  status: '',
  info: {},
  whishlistLength: 0,
};
export default createReducer(initialState, (builder) => {
  builder
    .addCase(
      loginRequest.fulfilled,
      (state, action) => {
        const { token, user } = action.payload;
        localStorage.setItem('token', token);
        state.token = token;
        state.profile = user;
        state.status = 'success';
      },
    )
  // eslint-disable-next-line no-unused-vars
    .addCase(loginRequest.rejected, (state, action) => {
      state.status = 'rejected';
    })
  /*   .addCase(loginRequest.pending, (state, action) => {
      state.status = 'pending';
    }) */
  // eslint-disable-next-line no-unused-vars
    .addCase(logOut, (state, action) => {
      localStorage.removeItem('token');
      state.token = '';
      window.location.href = '/login';
    })
    .addCase(registerRequest.fulfilled, (state, action) => {
      const { user } = action.payload;
      state.profile = user;
      state.errors = {};
    })
    .addCase(registerRequest.rejected, (state, action) => {
      const { errors, message } = action.payload;
      state.errors = errors;
      state.error = message;
    })
    .addCase(forgotPasswordRequest.fulfilled, (state, action) => {
      const { message } = action.payload;
      state.message = message;
    })
    .addCase(forgotPasswordRequest.rejected, (state, action) => {
      const { message } = action.payload;
      state.message = message;
    })
    .addCase(resetPasswordRequest.fulfilled, (state, action) => {
      const { message } = action.payload;
      state.message = message;
    })
    .addCase(resetPasswordRequest.rejected, (state, action) => {
      const { message } = action.payload;
      state.message = message;
    })
    .addCase(changePasswordRequest.fulfilled, (state, action) => {
      const { message } = action.payload;
      state.message = message;
    })
    .addCase(userProfileRequest.fulfilled, (state, action) => {
      state.profile = action.payload.user;
    })
    .addCase(userEditProfileRequest.fulfilled, (state, action) => {
      const { status, user } = action.payload;
      console.log(action.payload);
      state.message = status;
      state.profile = user;
    })
    .addCase(userWishListRequest.fulfilled, (state, action) => {
      const { items } = action.payload;
      state.wishlist = items;
    })
    .addCase(userWishListAddRequest.fulfilled, (state, action) => {
      const { item } = action.payload;
      state.wishlist.push(item);
      state.status = action.payload.status;
      state.whishlistLength = state.wishlist.length;
      console.log(state.status);
    })
    .addCase(userWishListAddRequest.pending, (state) => {
      state.wishlist = [];
    })
    .addCase(userWishListAddRequest.rejected, (state, action) => {
      const { message } = action.payload;
      state.status = action.payload.status;
      state.message = message;
      console.log(state.status);
    })
    .addCase(userWishListDeleteRequest.rejected, (state, action) => {
      const { message } = action.payload;
      state.message = message;
    })
    .addCase(userCardRequest.fulfilled, (state, action) => {
      const { items } = action.payload;
      state.card = items;
      state.info = action.payload;
    })
    .addCase(userCardAddRequest.fulfilled, (state, action) => {
      const { item } = action.payload;
      state.card.push(item);
      state.status = action.payload.status;
    })
    .addCase(userCardAddRequest.rejected, (state, action) => {
      const { message } = action.payload;
      state.status = action.payload;
      state.message = message;
    })
    .addCase(userCardDeleteRequest.rejected, (state, action) => {
      const { message } = action.payload;
      state.message = message;
    });
});
