import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/interceptor';

export const getCommentsByArticleId = createAsyncThunk(
  'comments/article/:articleId',
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
  },
);

// static async createComment(text, articleId) {
//   const response = await api.post(`/comments`, { text, articleId });

//   const data = await response.data;
//   return data;
// }

export const createComment = createAsyncThunk(
  'comments/',
  async ({ text, authorId, articleId }, { rejectWithValue }) => {
    try {
      await api.post('comments/', { text, authorId, articleId });
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);
