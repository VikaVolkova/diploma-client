import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/interceptor";

export const getCategories = createAsyncThunk(
  "/categories",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/category`);

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
