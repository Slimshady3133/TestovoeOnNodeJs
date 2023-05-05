import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import userSlice from './Components/auth/authRegSlice';
import blogSlice from './Components/blogs/blogSlice';

const store = configureStore({
  reducer: {
    users: userSlice,
    blog: blogSlice,
  },
});
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;
