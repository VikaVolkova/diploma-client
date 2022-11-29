import axios from "axios";
import { fetchToken } from "../features/auth/authActions";
import { useDispatch } from "react-redux";

const api = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
  baseURL: "http://localhost:5000/api",
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
    if (
      originalConfig.url !== "http://localhost:5000/api/users/register" &&
      err.response
    ) {
      if (err.response.status === 401 && !originalConfig._retry) {
        const dispatch = useDispatch();
        originalConfig._retry = true;
        try {
          const rs = dispatch(fetchToken());
          const { accessToken } = rs;
          localStorage.setItem("accessToken", accessToken);
          return api(originalConfig);
        } catch (_error) {
          return Promise.reject(_error);
        }
      }
    }
    return Promise.reject(err);
  }
);

export default api;
