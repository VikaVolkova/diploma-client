import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/interceptor";

let axiosConfig = {
  withCredentials: true,
};

export const login = createAsyncThunk(
  "user/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { data } = await api.post(
        "user/login",
        { email, password },
        axiosConfig
      );

      // store user's token in local storage
      localStorage.setItem("accessToken", data.accessToken);

      return data;
    } catch (error) {
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const register = createAsyncThunk(
  "user/register",
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      await api.post("user/register", { name, email, password });
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "user/forgot-password",
  async ({ email }, { rejectWithValue }) => {
    try {
      await api.post("user/forgot-password", { email });
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const restorePassword = createAsyncThunk(
  "user/restore-password",
  async ({ password1, password2, token }, { rejectWithValue }) => {
    try {
      const response = await api.post("user/restore-password", {
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
  }
);

export const fetchToken = createAsyncThunk(
  "user/token",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("user/token");
      const data = await response.data;
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
