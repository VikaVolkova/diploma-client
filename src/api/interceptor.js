import axios from 'axios';
import { getAccessToken, setAccessToken } from '../helpers/helpers';
import { ACCESS_TOKEN, ACTION_ROUTES, API_REQUEST_PROPS, REGISTER_URL } from '../helpers';

export const api = axios.create(API_REQUEST_PROPS);

api.interceptors.request.use(
  (config) => {
    const accessToken = getAccessToken();
    if (accessToken) {
      config.headers[ACCESS_TOKEN] = accessToken;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;
    if (originalConfig.url !== REGISTER_URL && err.response) {
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;
        try {
          const { data } = await api.get(ACTION_ROUTES.USER.TOKEN);
          const { accessToken } = data;
          setAccessToken(accessToken);
          return api.request(originalConfig);
        } catch (_error) {
          return Promise.reject(_error);
        }
      }
    }
    return Promise.reject(err);
  },
);
