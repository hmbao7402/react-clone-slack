import { configureStore } from '@reduxjs/toolkit';
import appReducer, { appSlice } from '../features/appSlice';

export const store = configureStore({
  reducer: {
    app: appReducer,
  },
});
