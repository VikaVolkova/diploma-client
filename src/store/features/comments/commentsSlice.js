import { createSlice } from '@reduxjs/toolkit';
import {
  getCommentsByArticleId,
  createComment,
  getUnpublishedComments,
  publishComment,
  deleteComment,
} from './commentsMiddlewares';

const setPending = (state) => {
  state.loadingComments = true;
  state.error = null;
};

const setError = (state, action) => {
  state.loadingComments = false;
  state.error = action.payload;
};

const initialState = {
  loadingComments: false,
  comments: [],
  comment: null,
  error: null,
  success: false,
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: {
    [getCommentsByArticleId.pending]: setPending,
    [getCommentsByArticleId.rejected]: setError,
    [getCommentsByArticleId.fulfilled]: (state, action) => {
      state.comments = action.payload.data;
      state.loadingComments = false;
      state.success = true;
      state.error = null;
    },
    [createComment.pending]: setPending,
    [createComment.rejected]: setError,
    [createComment.fulfilled]: (state, action) => {
      state.comment = action.payload;
      state.loadingComments = false;
      state.success = true;
      state.error = null;
    },
    [getUnpublishedComments.pending]: setPending,
    [getUnpublishedComments.rejected]: setError,
    [getUnpublishedComments.fulfilled]: (state, action) => {
      state.comments = action.payload.data;
      state.loadingComments = false;
      state.success = true;
      state.error = null;
    },
    [publishComment.pending]: setPending,
    [publishComment.rejected]: setError,
    [publishComment.fulfilled]: (state, action) => {
      state.comments = state.comments.filter((item) => item._id !== action.payload.data._id);
      state.comment = action.payload.data;
      state.loadingComments = false;
      state.success = true;
      state.error = null;
    },
    [deleteComment.pending]: setPending,
    [deleteComment.rejected]: setError,
    [deleteComment.fulfilled]: (state, action) => {
      state.comments = state.comments.filter((item) => item._id !== action.payload.data._id);
      state.comment = action.payload.data;
      state.loadingComments = false;
      state.success = true;
      state.error = null;
    },
  },
});

export default commentsSlice.reducer;
