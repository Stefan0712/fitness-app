import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import publicDataReducer from './publicDataSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    publicData: publicDataReducer
  }
});

export default store;
