/* eslint-disable react-hooks/rules-of-hooks */
import {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from "axios";
import { useRefreshToken } from "../hooks/useRefreshToken";
type ValidErr = Omit<Err, "config"> & { config: InternalAxiosRequestConfig };
let requestsToRetry: (() => unknown)[] = [];
let tokenIsBeingRefreshed = false;
type Err = AxiosError & { skipRefresh: boolean | undefined };
const retryFailedRequests = () => {
  requestsToRetry.forEach((callback) => callback());
  requestsToRetry = [];
};
export const ResponseOAuthInterceptor = (axios: AxiosInstance) => {
  axios.interceptors.response.use(undefined, async (error: Err) => {
    if (shouldHandleError(error)) {
      if (!tokenIsBeingRefreshed) {
        tokenIsBeingRefreshed = true;
        return useRefreshToken()
          .then((accessToken) => {
            if (accessToken) localStorage.setItem("accessToken", accessToken);
            tokenIsBeingRefreshed = false;
            retryFailedRequests();
            return axios.request(error.config);
          })
          .catch((otherError) => {
            tokenIsBeingRefreshed = false;
            return Promise.reject({ ...otherError, skipRefresh: true });
          });
      } else {
        return new Promise((resolve) => {
          requestsToRetry.push(() => resolve(axios(error.config)));
        });
      }
    } else {
      return Promise.reject({ ...error, skipRefresh: true });
    }
  });
};

const shouldHandleError = (error: Err): error is ValidErr => {
  return (
    error.response?.status === 401 &&
    error.config !== undefined &&
    !isRefreshRequest(error.config) &&
    !isLogOutRequest(error.config) &&
    !error.skipRefresh
  );
};


const isRefreshRequest = (config: AxiosRequestConfig) => {
  return config.url?.endsWith("/auth/refresh");
};

const isLogOutRequest = (config: AxiosRequestConfig) => {
  return config.url?.endsWith("/auth/logout");
};
