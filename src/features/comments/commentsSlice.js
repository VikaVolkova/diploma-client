import { createSlice } from "@reduxjs/toolkit";
import { getCommentsByArticleId } from "./commentsActions";

const setPending = (state) => {
  state.loading = true;
  state.loadingComments = null;
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
  },
});

export default commentsSlice.reducer;
