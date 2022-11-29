import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import aticleReducer from "../features/article/articleSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    article: aticleReducer,
  },
});
export default store;
