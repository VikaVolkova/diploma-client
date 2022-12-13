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
  async ({ text, author, article }, { rejectWithValue }) => {
    try {
      await api.post(ACTION_ROUTES.COMMENT.BASE, { text, author, article });
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);

export const getUnpublishedComments = createAsyncThunk(
  ACTION_ROUTES.COMMENT.GET_UNPUBLISHED_COMMENTS,
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get(ACTION_ROUTES.COMMENT.GET_UNPUBLISHED_COMMENTS);

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

export const publishComment = createAsyncThunk(
  ACTION_ROUTES.COMMENT.PUBLISH_COMMENT,
  async ({ id }, { rejectWithValue }) => {
    try {
      const data = await api.post(`${ACTION_ROUTES.COMMENT.PUBLISH_COMMENT}${id}`);

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

export const deleteComment = createAsyncThunk(
  ACTION_ROUTES.COMMENT.DELETE_COMMENT,
  async ({ id }, { rejectWithValue }) => {
    try {
      const data = await api.delete(`${ACTION_ROUTES.COMMENT.BASE}/${id}`);

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
