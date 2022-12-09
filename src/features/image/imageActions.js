import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/interceptor';

export const uploadImage = createAsyncThunk(
  'images/upload',
  async ({ image }, { rejectWithValue }) => {
    try {
      const data = api.post(
        'images/upload',
        { image },
        {
          headers: {
            'content-type': 'multipart/form-data',
          },
        },
      );

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
