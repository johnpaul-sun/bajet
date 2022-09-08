import { configureStore } from '@reduxjs/toolkit';
import TokenSlice from './Slices/TokenSlice/TokenSlice';

export const Store = configureStore({
  reducer: {
    user: TokenSlice,
  },
});
