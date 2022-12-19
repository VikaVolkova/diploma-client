import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../../api/interceptor';
import { ACTION_ROUTES } from '../../../helpers';
import { setAccessToken } from '../../../helpers/helpers';

let axiosConfig = {
  withCredentials: true,
};

export const login = createAsyncThunk(
  ACTION_ROUTES.USER.LOGIN,
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { data } = await api.post(ACTION_ROUTES.USER.LOGIN, { email, password }, axiosConfig);

      // store user's token in local storage
      setAccessToken(data.accessToken);

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
      const response = await api.post(`${ACTION_ROUTES.USER.RESTORE_PASSWORD}?token=${token}`, {
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

export const updatePassword = createAsyncThunk(
  ACTION_ROUTES.USER.CHECK_PASSWORD,
  async ({ oldPassword, password1, password2, token }, { rejectWithValue }) => {
    try {
      const response = await api.post(ACTION_ROUTES.USER.CHECK_PASSWORD, { oldPassword, token });
      !!response &&
        (await api.post(`${ACTION_ROUTES.USER.RESTORE_PASSWORD}?token=${token}`, {
          password1,
          password2,
          token,
        }));
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

export const getAllUsers = createAsyncThunk(
  ACTION_ROUTES.USER.GET_ALL_USERS,
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(ACTION_ROUTES.USER.GET_ALL_USERS);
      const { users } = await response.data;
      return users;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);

export const updateRole = createAsyncThunk(
  ACTION_ROUTES.USER.BASE,
  async ({ email, role }, { rejectWithValue }) => {
    try {
      await api.put(ACTION_ROUTES.USER.BASE, { email, role });
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);
