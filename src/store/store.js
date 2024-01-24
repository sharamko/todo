import { configureStore } from '@reduxjs/toolkit';
import reducer from './slice';

export const store = configureStore({
  reducer: {
    slice: reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
