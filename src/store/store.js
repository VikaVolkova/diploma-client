import { configureStore } from '@reduxjs/toolkit';
import authSlice from './features/auth/authSlice';
import articleSlice from './features/article/articleSlice';
import commentsSlice from './features/comments/commentsSlice';
import categorySlice from './features/category/categorySlice';
import imageSlice from './features/image/imageSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    article: articleSlice,
    comments: commentsSlice,
    category: categorySlice,
    image: imageSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
