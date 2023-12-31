import { AxiosInstance } from "axios";

export const RequestAccessTokenInterceptor = (axios: AxiosInstance) => {
  axios.interceptors.request.use(
    (config) => {
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error) => {
      Promise.reject(error);
    }
  );
};
