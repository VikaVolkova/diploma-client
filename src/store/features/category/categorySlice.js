import { createSlice } from '@reduxjs/toolkit';
import {
  getCategories,
  getAllCategories,
  createCategory,
  deleteCategory,
  updateCategory,
  getCategoryByUrl,
} from './categoryMiddlewares';

const setPending = (state) => {
  state.loadingCategories = true;
  state.error = null;
};

const setError = (state, action) => {
  state.loadingCategories = false;
  state.error = action.payload;
};

const initialState = {
  loadingCategories: false,
  categories: [],
  allCategories: [],
  category: null,
  error: null,
  success: false,
};

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers: {
    [getCategories.pending]: setPending,
    [getCategories.rejected]: setError,
    [getCategories.fulfilled]: (state, action) => {
      state.categories = action.payload;
      state.loadingCategories = false;
      state.success = true;
      state.error = null;
    },
    [getAllCategories.pending]: setPending,
    [getAllCategories.rejected]: setError,
    [getAllCategories.fulfilled]: (state, action) => {
      state.allCategories = action.payload;
      state.loadingCategories = false;
      state.success = true;
      state.error = null;
    },
    [getCategoryByUrl.pending]: setPending,
    [getCategoryByUrl.rejected]: setError,
    [getCategoryByUrl.fulfilled]: (state, action) => {
      state.category = action.payload;
      state.loadingCategories = false;
      state.success = true;
      state.error = null;
    },
    [createCategory.pending]: setPending,
    [createCategory.rejected]: setError,
    [createCategory.fulfilled]: (state, action) => {
      state.category = action.payload.data;
      state.loadingCategories = false;
      state.success = true;
      state.error = null;
    },
    [updateCategory.pending]: setPending,
    [updateCategory.rejected]: setError,
    [updateCategory.fulfilled]: (state, action) => {
      state.allCategories = action.payload.categories;
      state.loadingCategories = false;
      state.success = true;
      state.error = null;
    },
    [deleteCategory.pending]: setPending,
    [deleteCategory.rejected]: setError,
    [deleteCategory.fulfilled]: (state, action) => {
      state.allCategories = action.payload.categories;
      state.loadingCategories = false;
      state.success = true;
      state.error = null;
    },
  },
});

export default categorySlice.reducer;
