import axios from "axios";
import {
  LoginInput,
  LoginResponseData,
  ProductWithImage,
  ProductWithImageAndUser,
  RegisterInput,
  User,
  UserWithFollows,
} from "../types/types";
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
  const response = await axiosApi.post("auth/register", {
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
}: LoginInput): Promise<LoginResponseData> => {
  const response = await axiosApi.post("auth/login", {
    username,
    password,
  });
  return response.data;
};

export const getUserProfileInfo = async (): Promise<User> => {
  const response = await axiosApi.get("users/profile");
  return response.data as User;
};

export const addProduct = async (formDataToBackend: FormData) => {
  const response = await axiosApi.post("products/upload", formDataToBackend, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const getUserProducts = async (userId: number) => {
  const response = await axiosApi.get(`products/${userId}`);
  return response.data;
};

export const getUserSingleProduct = async (
  productId: number
): Promise<ProductWithImage> => {
  const response = await axiosApi.get(`products/${productId}`);
  return response.data;
};

export const getProducts = async (): Promise<ProductWithImageAndUser[]> => {
  const response = await axiosApi.get("products");
  return response.data;
};

export const getUserData = async (userId: number): Promise<UserWithFollows> => {
  const response = await axiosApi.get(`users/${userId}`);
  return response.data;
};

export const followUser = async (userId: number) => {
  const response = await axiosApi.post(`followers/follow/${userId}`);
  return response.data;
};
