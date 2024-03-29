import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../../api/interceptor';
import { ACTION_ROUTES } from '../../../helpers';

export const getCategories = createAsyncThunk(
  ACTION_ROUTES.CATEGORY.GET_ACTIVE_CATEGORIES,
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get(ACTION_ROUTES.CATEGORY.GET_ACTIVE_CATEGORIES);

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

export const getAllCategories = createAsyncThunk(
  ACTION_ROUTES.CATEGORY.GET_ALL_CATEGORIES,
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get(ACTION_ROUTES.CATEGORY.GET_ALL_CATEGORIES);

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

export const getCategoryByUrl = createAsyncThunk(
  ACTION_ROUTES.CATEGORY.BASE,
  async ({ categoryUrl }, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`${ACTION_ROUTES.CATEGORY.BASE}${categoryUrl}`);

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

export const createCategory = createAsyncThunk(
  ACTION_ROUTES.CATEGORY.CREATE,
  async (categoryData, { rejectWithValue }) => {
    try {
      const { data } = await api.post(ACTION_ROUTES.CATEGORY.BASE, categoryData);

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
export const updateCategory = createAsyncThunk(
  ACTION_ROUTES.CATEGORY.UPDATE,
  async ({ id, name, url }, { rejectWithValue }) => {
    try {
      const { data } = await api.put(`${ACTION_ROUTES.CATEGORY.UPDATE}/${id}`, { name, url });
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

export const deleteCategory = createAsyncThunk(
  ACTION_ROUTES.CATEGORY.DELETE,
  async ({ id }, { rejectWithValue }) => {
    try {
      const { data } = await api.put(`${ACTION_ROUTES.CATEGORY.DELETE}/${id}`);
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
