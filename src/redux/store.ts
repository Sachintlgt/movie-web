// redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import loaderReducer from './loaderSlice';
import movieListReducer from './movieListSlice';

const store = configureStore({
  reducer: {
    loader: loaderReducer,
    movieList : movieListReducer
  },
});

export default store;