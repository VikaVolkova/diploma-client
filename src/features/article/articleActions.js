import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/interceptor";

export const getArticles = createAsyncThunk(
  "/news",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/news`);

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

export const getArticleByUrl = createAsyncThunk(
  "/news/:categoryUrl/:newsUrl",
  async ({ newsUrl }, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/news/${newsUrl}`);

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

export const getArticlesByCategoryUrl = createAsyncThunk(
  "/news/:categoryUrl",
  async ({ categoryUrl }, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/news/category/${categoryUrl}`);

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
