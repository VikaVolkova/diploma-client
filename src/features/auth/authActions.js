import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/interceptor';
import { ACTION_ROUTES } from '../../helpers/routes';

let axiosConfig = {
  withCredentials: true,
};

export const login = createAsyncThunk(
  ACTION_ROUTES.USER.LOGIN,
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { data } = await api.post(ACTION_ROUTES.USER.LOGIN, { email, password }, axiosConfig);

      // store user's token in local storage
      localStorage.setItem('accessToken', data.accessToken);

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

export const register = createAsyncThunk(
  ACTION_ROUTES.USER.REGISTER,
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      await api.post(ACTION_ROUTES.USER.REGISTER, { name, email, password });
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);

export const forgotPassword = createAsyncThunk(
  ACTION_ROUTES.USER.FORGOT_PASSWORD,
  async ({ email }, { rejectWithValue }) => {
    try {
      await api.post(ACTION_ROUTES.USER.FORGOT_PASSWORD, { email });
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);

export const restorePassword = createAsyncThunk(
  ACTION_ROUTES.USER.RESTORE_PASSWORD,
  async ({ password1, password2, token }, { rejectWithValue }) => {
    try {
      const response = await api.post(ACTION_ROUTES.USER.RESTORE_PASSWORD, {
        password1,
        password2,
        token,
      });

      const data = await response.data;
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

export const fetchToken = createAsyncThunk(
  ACTION_ROUTES.USER.TOKEN,
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(ACTION_ROUTES.USER.TOKEN);
      const data = await response.data;
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

export const getUser = createAsyncThunk(
  ACTION_ROUTES.USER.GET_USER,
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(ACTION_ROUTES.USER.GET_USER);
      const data = await response.data;
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
