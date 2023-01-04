import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../../api/interceptor';
import { ACTION_ROUTES } from '../../../helpers';

export const getCategories = createAsyncThunk(
  ACTION_ROUTES.CATEGORY.BASE,
  async ({ isActive }, { rejectWithValue }) => {
    try {
      const { data } = await api.get(
        isActive ? ACTION_ROUTES.CATEGORY.GET_ACTIVE_CATEGORIES : ACTION_ROUTES.CATEGORY.BASE,
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

export const deleteCategory = createAsyncThunk(
  ACTION_ROUTES.CATEGORY.DELETE,
  async ({ id }, { rejectWithValue }) => {
    try {
      const { data } = await api.put(`${ACTION_ROUTES.CATEGORY.DELETE}/${id}`);
      console.log(data);
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
