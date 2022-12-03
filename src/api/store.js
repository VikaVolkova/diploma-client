import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import aticleReducer from "../features/article/articleSlice";
import commentsReducer from "../features/comments/commentsSlice";
import categorySlice from "../features/category/categorySlice";
import imageSlice from "../features/image/imageSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    article: aticleReducer,
    comments: commentsReducer,
    category: categorySlice,
    image: imageSlice,
  },
});
export default store;
