import { createSlice } from "@reduxjs/toolkit";
import { uploadImage } from "./imageActions";

const setPending = (state) => {
  state.loadingImages = true;
  state.error = null;
};

const setError = (state, action) => {
  state.loadingImages = false;
  state.error = action.payload;
};

const initialState = {
  loadingImages: true,
  image: {},
  error: null,
  success: false,
};

const imageSlice = createSlice({
  name: "image",
  initialState,
  reducers: {},
  extraReducers: {
    [uploadImage.pending]: setPending,
    [uploadImage.rejected]: setError,
    [uploadImage.fulfilled]: (state, action) => {
      state.image = action.payload.data;
      state.loadingImages = false;
      state.success = true;
      state.error = null;
    },
  },
});

export default imageSlice.reducer;
