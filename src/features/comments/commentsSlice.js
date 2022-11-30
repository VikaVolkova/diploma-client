import { createSlice } from "@reduxjs/toolkit";
import { getCommentsByArticleId, createComment } from "./commentsActions";

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
  name: "comments",
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
    [createComment.fulfilled]: (state) => {
      state.loadingComments = false;
      state.success = true;
      state.error = null;
    },
  },
});

export default commentsSlice.reducer;
