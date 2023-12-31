import axios from "axios";
import { LoginInput, RegisterInput } from "../types/types";
import { RequestAccessTokenInterceptor } from "./request-access-token.interceptor";
import { ResponseOAuthInterceptor } from "./response-auth.interceptor";

const BASE_URL = "http://localhost:3000";

export const axiosApi = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});
RequestAccessTokenInterceptor(axiosApi);
ResponseOAuthInterceptor(axiosApi);
export const registerUser = async ({
  username,
  confirmPassword,
  email,
  password,
}: RegisterInput) => {
  const response = await axiosApi.post("blabla", {
    username,
    confirmPassword,
    email,
    password,
  });
  return response.data;
};

export const signInUser = async ({
  username,
  password,
}: LoginInput): Promise<string> => {
  const response = await axiosApi.post("auth/login", {
    username,
    password,
  });
  return response.data;
};
