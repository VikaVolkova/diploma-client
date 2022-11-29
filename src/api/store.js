import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import aticleReducer from "../features/article/articleSlice";
import commentsReducer from "../features/comments/commentsSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    article: aticleReducer,
    comments: commentsReducer,
  },
});
export default store;
