import axios from "axios";
import { LoginInput, RegisterInput } from "../types/types";

const BASE_URL = "http://localhost:3000";

export const axiosApi = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

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

export const signInUser = async ({ username, password }: LoginInput) => {
  const response = await axiosApi.post("loginendpoint", {
    username,
    password,
  });
  return response.data;
};
