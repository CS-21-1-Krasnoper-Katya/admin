import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import categoryReducer from '../components/Category/categorySlice';
import goodReducer from '../components/Good/goodSlice';

export const store = configureStore({
  reducer: {
    category: categoryReducer,
    good: goodReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
