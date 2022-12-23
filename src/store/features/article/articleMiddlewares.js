import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../../api/interceptor';
import { ACTION_ROUTES } from '../../../helpers';

export const getArticles = createAsyncThunk(
  `${ACTION_ROUTES.ARTICLE.BASE}/`,
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get(ACTION_ROUTES.ARTICLE.BASE);

      return data;
    } catch (error) {
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);

export const getArticleByUrl = createAsyncThunk(
  ACTION_ROUTES.ARTICLE.GET_ARTICLE_BY_URL,
  async ({ newsUrl }, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`${ACTION_ROUTES.ARTICLE.BASE}/${newsUrl}`);

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

export const getArticlesByCategoryUrl = createAsyncThunk(
  ACTION_ROUTES.ARTICLE.GET_ARTICLES_BY_CATEGORY_URL,
  async ({ categoryUrl }, { rejectWithValue }) => {
    try {
      const { data } = await api.get(
        `${ACTION_ROUTES.ARTICLE.GET_ARTICLES_BY_CATEGORY_URL}${categoryUrl}`,
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

export const getUnpublishedArticles = createAsyncThunk(
  ACTION_ROUTES.ARTICLE.GET_UNPUBLISHED_ARTICLES,
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get(ACTION_ROUTES.ARTICLE.GET_UNPUBLISHED_ARTICLES);

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

export const createArticle = createAsyncThunk(
  ACTION_ROUTES.ARTICLE.BASE,
  async (data, { rejectWithValue }) => {
    try {
      await api.post(ACTION_ROUTES.ARTICLE.BASE, data);
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);

export const toggleArticlePublish = createAsyncThunk(
  ACTION_ROUTES.ARTICLE.TOGGLE_ARTICLE_PUBLISH,
  async ({ id, isPublished }, { rejectWithValue }) => {
    try {
      const data = await api.post(
        `${ACTION_ROUTES.ARTICLE.TOGGLE_ARTICLE_PUBLISH}${id}?isPublished=${isPublished}`,
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

export const deleteArticle = createAsyncThunk(
  ACTION_ROUTES.ARTICLE.DELETE_ARTICLE,
  async ({ id }, { rejectWithValue }) => {
    try {
      const data = await api.delete(`${ACTION_ROUTES.ARTICLE.BASE}/${id}`);

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

export const updateArticle = createAsyncThunk(
  ACTION_ROUTES.ARTICLE.UPDATE_ARTICLE,
  async ({ id, title, url, spoiler, content, category, coverImage }, { rejectWithValue }) => {
    try {
      const updatedArticle = await api.put(`${ACTION_ROUTES.ARTICLE.UPDATE_ARTICLE}${id}`, {
        title,
        url,
        spoiler,
        content,
        category,
        coverImage,
      });

      return updatedArticle;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);

export const getPopularArticles = createAsyncThunk(
  ACTION_ROUTES.ARTICLE.GET_POPULAR_ARTICLES,
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get(ACTION_ROUTES.ARTICLE.GET_POPULAR_ARTICLES);
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

export const toggleLike = createAsyncThunk(
  ACTION_ROUTES.ARTICLE.TOGGLE_ARTICLE_LIKE,
  async ({ articleId, liked }, { rejectWithValue }) => {
    try {
      const { data } = await api.put(`${ACTION_ROUTES.ARTICLE.TOGGLE_ARTICLE_LIKE}${articleId}`, {
        liked,
      });
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

export const toggleComment = createAsyncThunk(
  ACTION_ROUTES.ARTICLE.ADD_COMMENT,
  async ({ articleId, commentId, deleted }, { rejectWithValue }) => {
    try {
      const { data } = await api.put(`${ACTION_ROUTES.ARTICLE.ADD_COMMENT}${articleId}`, {
        commentId,
        deleted,
      });
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
