import { createSlice } from "@reduxjs/toolkit";
import {
  register,
  login,
  forgotPassword,
  restorePassword,
  fetchToken,
} from "./authActions";
import jwtDecode from "jwt-decode";

// initialize userToken from local storage
const accessToken = localStorage.getItem("accessToken")
  ? localStorage.getItem("accessToken")
  : null;

const initialState = {
  loading: false,
  userInfo: null,
  accessToken,
  error: null,
  success: false,
};

const setPending = (state) => {
  state.loading = true;
  state.error = null;
};

const setError = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      localStorage.removeItem("accessToken"); // delete token from storage
      return {
        ...state,
        loading: false,
        userInfo: null,
        accessToken: null,
        error: null,
      };
    },
    loadUser(state, action) {
      const token = state.accessToken;
      if (token) {
        const user = jwtDecode(token);
        return {
          ...state,
          loading: false,
          accessToken: action.payload,
          userInfo: user,
        };
      }
    },
  },
  extraReducers: {
    // login user
    [login.pending]: setPending,
    [login.fulfilled]: (state, action) => {
      state.loading = false;
      state.userInfo = action.payload;
      state.accessToken = action.payload.accessToken;
      state.success = true;
    },
    [login.rejected]: setError,
    // register user
    [register.pending]: setPending,
    [register.fulfilled]: (state) => {
      state.loading = false;
      state.success = true; // registration successful
    },
    [register.rejected]: setError,
    [forgotPassword.pending]: setPending,
    [forgotPassword.fulfilled]: (state, action) => {
      state.loading = false;
      state.userInfo = action.payload;
      state.success = true;
    },
    [forgotPassword.rejected]: setError,
    [restorePassword.pending]: setPending,
    [restorePassword.fulfilled]: (state) => {
      state.loading = false;
      state.success = true;
    },
    [restorePassword.rejected]: setError,
    [fetchToken.pending]: setPending,
    [fetchToken.fulfilled]: (state, action) => {
      state.loading = false;
      state.success = true;
      state.accessToken = action.payload.accessToken;
    },
    [fetchToken.rejected]: setError,
  },
});

export const { logout, loadUser } = authSlice.actions;

export default authSlice.reducer;
