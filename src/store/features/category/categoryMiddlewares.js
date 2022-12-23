import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../../api/interceptor';
import { ACTION_ROUTES } from '../../../helpers';

export const getCategories = createAsyncThunk(
  ACTION_ROUTES.CATEGORY.BASE,
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get(ACTION_ROUTES.CATEGORY.BASE);

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

export const createCategory = createAsyncThunk(
  ACTION_ROUTES.CATEGORY.CREATE,
  async (categoryData, { rejectWithValue }) => {
    try {
      const { data } = await api.post(ACTION_ROUTES.CATEGORY.BASE, categoryData);

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
