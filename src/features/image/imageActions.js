import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/interceptor';
import { ACTION_ROUTES } from '../../helpers/routes';

export const uploadImage = createAsyncThunk(
  ACTION_ROUTES.IMAGE.UPLOAD,
  async ({ image }, { rejectWithValue }) => {
    try {
      const data = api.post(
        ACTION_ROUTES.IMAGE.UPLOAD,
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
