import { createSlice } from "@reduxjs/toolkit";
import { getCategories } from "./categoryActions";

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
  error: null,
  success: false,
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: {
    [getCategories.pending]: setPending,
    [getCategories.rejected]: setError,
    [getCategories.fulfilled]: (state, action) => {
      state.categories = action.payload.data;
      state.loadingCategories = false;
      state.success = true;
      state.error = null;
    },
  },
});

export default categorySlice.reducer;
