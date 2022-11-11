import axios from "axios";
import QueryHandler from ".";

const api = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
  baseURL: "/api",
});

api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken") || "";
    if (accessToken) {
      config.headers["x-access-token"] = accessToken;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;
    if (originalConfig.url !== "/api/users/register" && err.response) {
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;
        try {
          const rs = await QueryHandler.fetchToken();
          const { accessToken } = rs;
          localStorage.setItem("accessToken", accessToken);
          return api(originalConfig);
        } catch (_error) {
          console.log(_error);
          return Promise.reject(_error);
        }
      }
    }
    return Promise.reject(err);
  }
);

export default api;
