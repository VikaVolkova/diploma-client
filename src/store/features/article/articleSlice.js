import { createSlice } from '@reduxjs/toolkit';
import {
  getArticles,
  getPopularArticles,
  getArticlesByCategoryUrl,
  getArticleByUrl,
  createArticle,
  getUnpublishedArticles,
  toggleArticlePublish,
  deleteArticle,
  updateArticle,
  toggleLike,
  toggleComment,
} from './articleMiddlewares';

const setPending = (state) => {
  state.loadingArticles = true;
  state.error = null;
};

const setError = (state, action) => {
  state.loadingArticles = false;
  state.error = action.payload;
};

const initialState = {
  loadingArticles: false,
  popularArticles: [],
  articles: [],
  article: null,
  error: null,
  success: false,
};

const articleSlice = createSlice({
  name: 'article',
  initialState,
  reducers: {},
  extraReducers: {
    [getArticles.pending]: setPending,
    [getArticles.rejected]: setError,
    [getArticles.fulfilled]: (state, action) => {
      state.articles = action.payload.data;
      state.loadingArticles = false;
      state.success = true;
      state.error = null;
    },
    [getPopularArticles.pending]: setPending,
    [getPopularArticles.rejected]: setError,
    [getPopularArticles.fulfilled]: (state, action) => {
      state.popularArticles = action.payload.data;
      state.loadingArticles = false;
      state.success = true;
      state.error = null;
    },
    [getArticlesByCategoryUrl.pending]: setPending,
    [getArticlesByCategoryUrl.rejected]: setError,
    [getArticlesByCategoryUrl.fulfilled]: (state, action) => {
      state.articles = action.payload.data;
      state.loadingArticles = false;
      state.success = true;
      state.error = null;
    },
    [getArticleByUrl.pending]: setPending,
    [getArticleByUrl.rejected]: setError,
    [getArticleByUrl.fulfilled]: (state, action) => {
      state.article = action.payload.article;
      state.articles = [];
      state.loadingArticles = false;
      state.success = true;
      state.error = null;
    },
    [getUnpublishedArticles.pending]: setPending,
    [getUnpublishedArticles.rejected]: setError,
    [getUnpublishedArticles.fulfilled]: (state, action) => {
      state.articles = action.payload.data;
      state.loadingArticles = false;
      state.success = true;
      state.error = null;
    },
    [createArticle.pending]: setPending,
    [createArticle.rejected]: setError,
    [createArticle.fulfilled]: (state) => {
      state.loadingArticles = false;
      state.success = true;
      state.error = null;
    },
    [deleteArticle.pending]: setPending,
    [deleteArticle.rejected]: setError,
    [deleteArticle.fulfilled]: (state, action) => {
      state.articles = state.articles.filter((item) => item._id !== action.payload.data._id);
      state.article = action.payload.data;
      state.loadingArticles = false;
      state.success = true;
      state.error = null;
    },
    [updateArticle.pending]: setPending,
    [updateArticle.rejected]: setError,
    [updateArticle.fulfilled]: (state, action) => {
      state.article = action.payload.data;
      state.loadingArticles = false;
      state.success = true;
      state.error = null;
    },
    [toggleArticlePublish.pending]: setPending,
    [toggleArticlePublish.rejected]: setError,
    [toggleArticlePublish.fulfilled]: (state, action) => {
      state.articles = state.articles.filter((item) => item._id !== action.payload.data._id);
      state.article = action.payload.data;
      state.loadingArticles = false;
      state.success = true;
      state.error = null;
    },
    [toggleLike.pending]: setPending,
    [toggleLike.rejected]: setError,
    [toggleLike.fulfilled]: (state, action) => {
      state.article = action.payload.data;
      state.loadingArticles = false;
      state.success = true;
      state.error = null;
    },
    [toggleComment.pending]: setPending,
    [toggleComment.rejected]: setError,
    [toggleComment.fulfilled]: (state, action) => {
      state.article = action.payload.data;
      state.loadingArticles = false;
      state.success = true;
      state.error = null;
    },
  },
});

export default articleSlice.reducer;
