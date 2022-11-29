import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/interceptor";

export const getCommentsByArticleId = createAsyncThunk(
  "comments/article/:articleId",
  async ({ articleId }, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/comments/article/${articleId}`);

      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
