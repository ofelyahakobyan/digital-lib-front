import { configureStore } from '@reduxjs/toolkit';
import reducers from './reducers';

const store = configureStore({
  devTools: true,
  reducer: reducers,
});

export default store;
