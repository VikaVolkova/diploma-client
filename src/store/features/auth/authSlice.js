import { createSlice } from '@reduxjs/toolkit';
import {
  register,
  login,
  forgotPassword,
  restorePassword,
  updatePassword,
  fetchToken,
  getUser,
  getAllUsers,
  updateRole,
  updateUser,
  deleteUser,
  toggleBlockUser,
} from './authMiddlewares';
import jwtDecode from 'jwt-decode';
import { TOKENS } from '../../../helpers';
import { getAccessToken, removeItemFromStorage } from '../../../helpers/helpers';

// initialize userToken from local storage
const accessToken = getAccessToken();

const initialState = {
  loading: false,
  users: [],
  userInfo: null,
  accessToken,
  error: null,
  success: false,
  registered: false,
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
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      removeItemFromStorage(TOKENS.ACCESS_TOKEN); // delete token from storage
      return {
        ...state,
        loading: false,
        userInfo: null,
        accessToken: null,
        error: null,
      };
    },
    loadUser(state) {
      const token = state.accessToken ? state.accessToken : getAccessToken();
      if (token) {
        const user = jwtDecode(token);
        return {
          ...state,
          userInfo: {
            _id: user._id,
            image: user.picture ? user.picture : user.image,
            email: user.email,
            name: user.name,
            isBlocked: user.isBlocked,
            role: user.role ? user.role : 'USER',
          },
          registeredGoogle: user._id ? false : true,
        };
      }
    },
  },
  extraReducers: {
    // login user
    [login.pending]: setPending,
    [login.fulfilled]: (state, action) => {
      state.loading = false;
      state.userInfo = action.payload.userData;
      state.accessToken = action.payload.accessToken;
      state.success = true;
    },
    [login.rejected]: setError,
    // register user
    [register.pending]: setPending,
    [register.fulfilled]: (state) => {
      state.registered = true;
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
    [updatePassword.pending]: setPending,
    [updatePassword.fulfilled]: (state) => {
      state.loading = false;
      state.success = true;
    },
    [updatePassword.rejected]: setError,
    [fetchToken.pending]: setPending,
    [fetchToken.fulfilled]: (state, action) => {
      state.loading = false;
      state.success = true;
      state.accessToken = action.payload.accessToken;
    },
    [fetchToken.rejected]: setError,
    [getUser.pending]: setPending,
    [getUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.success = true;
      state.userInfo = action.payload;
    },
    [getUser.rejected]: setError,
    [getAllUsers.pending]: setPending,
    [getAllUsers.fulfilled]: (state, action) => {
      state.users = action.payload;
      state.loading = false;
      state.success = true;
    },
    [getAllUsers.rejected]: setError,
    [updateRole.pending]: setPending,
    [updateRole.fulfilled]: (state, action) => {
      state.users = action.payload.data;
      state.loading = false;
      state.success = true;
    },
    [updateRole.rejected]: setError,
    [toggleBlockUser.pending]: setPending,
    [toggleBlockUser.fulfilled]: (state, action) => {
      state.users = action.payload.data;
      state.loading = false;
      state.success = true;
    },
    [toggleBlockUser.rejected]: setError,
    [updateUser.pending]: setPending,
    [updateUser.fulfilled]: (state, action) => {
      state.userInfo = {
        ...state,
        image: action.payload.image,
        email: action.payload.email,
        name: action.payload.name,
      };
      state.loading = false;
      state.success = true;
    },
    [updateUser.rejected]: setError,
    [deleteUser.pending]: setPending,
    [deleteUser.fulfilled]: (state) => {
      state.userInfo = null;
      state.loading = false;
      state.success = true;
    },
    [deleteUser.rejected]: setError,
  },
});

export const { logout, loadUser, loginGoogle } = authSlice.actions;

export default authSlice.reducer;
