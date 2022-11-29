import { createSlice } from "@reduxjs/toolkit";
import {
  getArticles,
  getArticlesByCategoryUrl,
  getArticleByUrl,
} from "./articleActions";

const setPending = (state) => {
  state.loading = true;
  state.error = null;
};

const setError = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

const initialState = {
  loading: false,
  articles: [],
  article: null,
  error: null,
  success: false,
};

const articleSlice = createSlice({
  name: "article",
  initialState,
  reducers: {},
  extraReducers: {
    [getArticles.pending]: setPending,
    [getArticles.rejected]: setError,
    [getArticles.fulfilled]: (state, action) => {
      state.articles = action.payload.data;
      state.loading = false;
      state.success = true;
      state.error = null;
    },
    [getArticlesByCategoryUrl.pending]: setPending,
    [getArticlesByCategoryUrl.rejected]: setError,
    [getArticlesByCategoryUrl.fulfilled]: (state, action) => {
      state.articles = action.payload.data;
      state.loading = false;
      state.success = true;
      state.error = null;
    },
    [getArticleByUrl.pending]: setPending,
    [getArticleByUrl.rejected]: setError,
    [getArticleByUrl.fulfilled]: (state, action) => {
      state.article = action.payload.article;
      console.log();
      state.articles = [];
      state.loading = false;
      state.success = true;
      state.error = null;
    },
  },
});

export default articleSlice.reducer;
