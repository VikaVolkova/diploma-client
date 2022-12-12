import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/interceptor';
import { ACTION_ROUTES } from '../../helpers/routes';

export const getCommentsByArticleId = createAsyncThunk(
  ACTION_ROUTES.COMMENT.GET_COMMENTS_BY_ARTICLE_ID,
  async ({ articleId }, { rejectWithValue }) => {
    try {
      const { data } = await api.get(
        `${ACTION_ROUTES.COMMENT.GET_COMMENTS_BY_ARTICLE_ID}${articleId}`,
      );

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

export const createComment = createAsyncThunk(
  ACTION_ROUTES.COMMENT.BASE,
  async ({ text, authorId, articleId }, { rejectWithValue }) => {
    try {
      await api.post(ACTION_ROUTES.COMMENT.BASE, { text, authorId, articleId });
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);
