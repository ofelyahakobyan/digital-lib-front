import { createReducer } from '@reduxjs/toolkit';
import {
  forgotPasswordRequest,
  loginRequest, logOut, registerRequest, resetPasswordRequest,
} from '../actions/users';

const initialState = {
  token: localStorage.getItem('token') || '',
  profile: {},
  errors: {},
  users: [],
  message: '',
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
      },
    )
  // eslint-disable-next-line no-unused-vars
    .addCase(loginRequest.rejected, (state, action) => {
    })
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
      const { message } = action.payload;
      state.errors.message = message;
    })
    .addCase(forgotPasswordRequest.fulfilled, (state, action) => {
      const { message } = action.payload;
      state.message = message;
    })
    .addCase(forgotPasswordRequest.rejected, (state, action) => {
      console.log(action);
      const { message } = action.payload;
      state.message = message;
    })
    .addCase(resetPasswordRequest.fulfilled, (state, action) => {
      const { message } = action.payload;
      state.message = message;
    })
    .addCase(resetPasswordRequest.rejected, (state, action) => {
      const { message } = action.payload;
      console.log(action.payload);
      state.message = message;
    });

  // eslint-disable-next-line no-unused-vars
});
