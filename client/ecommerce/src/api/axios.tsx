import axios from "axios";
import {
  Brand,
  Conversation,
  ExtendedUserWithProfile,
  FetchedNotifications,
  LoginInput,
  LoginResponseData,
  Notification,
  ProductNotification,
  ProductWithImage,
  ProductWithImageAndUser,
  ProductWithImageAndUserSchema,
  RegisterInput,
  SimpleNotification,
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

export const getGivenUserProducts = async (userId: number) => {
  const response = await axiosApi.get(`products/user/${userId}`);
  return response.data as ProductWithImageAndUser[];
};

export const getUserSingleProduct = async (
  productId: number
): Promise<ProductWithImage> => {
  const response = await axiosApi.get(`products/${productId}`);
  return response.data;
};

export const getProduct = async (
  productId: number
): Promise<ProductWithImageAndUser> => {
  const response = await axiosApi.get(`products/${productId}`);
  return response.data;
};

export const getProducts = async (): Promise<ProductWithImageAndUser[]> => {
  const response = await axiosApi.get("products");
  return response.data;
};

export const getUserData = async (
  userId: number
): Promise<ExtendedUserWithProfile> => {
  const response = await axiosApi.get(`users/${userId}`);
  return response.data;
};

export const followUser = async (userId: number) => {
  const response = await axiosApi.post(`followers/follow/${userId}`);
  return response.data;
};

export const fetchFilteredProducts = async (
  order: string,
  brand: Brand,
  category: string
): Promise<ProductWithImageAndUser[]> => {
  if (order && brand) {
    const response = await axiosApi.get(
      `products/filtered/?category=${category}&order=${order}&brand=${brand}`
    );
    return response.data;
  } else if (order) {
    const response = await axiosApi.get(
      `products/filtered/?category=${category}&order=${order}`
    );
    return response.data;
  } else if (brand) {
    const response = await axiosApi.get(
      `products/filtered/?category=${category}&brand=${brand}`
    );
    return response.data;
  } else {
    const response = await axiosApi.get(
      `products/filtered/?category=${category}`
    );
    return response.data;
  }
};

export const createConversationAndSendFirstMessage = async (
  content: string,
  userId: number
) => {
  const response = await axiosApi.post(`messages/new?receiverId=${userId}`, {
    content,
  });
  return response.data;
};

export const getAllConversations = async () => {
  const response = await axiosApi.get(`conversations`);
  return response.data as Conversation[];
};

export const getAllUserConversations = async (userId: number) => {
  const response = await axiosApi.get(`conversations/users/${userId}`);
  return response.data as Conversation;
};

export const deleteConversation = async (conversationId: number) => {
  const response = await axiosApi.delete(`conversations/${conversationId}`);
  return response.data;
};

export const getFilteredProductsBySearchText = async (searchText: string) => {
  const response = await axiosApi.get(`products/q/?search_text=${searchText}`);
  return response.data as ProductWithImageAndUser[];
};

export const updateProfile = async (formData: FormData) => {
  const response = await axiosApi.post(`users/profile/update`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const sendProductInfoToCheckout = async (
  product: ProductWithImageAndUser
) => {
  const response = await axiosApi.post(
    "products/create-checkout-session",
    product
  );
  return response.data;
};

export const deleteProduct = async (productId: number) => {
  const response = await axiosApi.delete(`products/${productId}`);
  return response.data;
};

export const fetchNotifications = async () => {
  const response = await axiosApi.get("notifications");
  return response.data as FetchedNotifications[];
};

export const addNotification = async (notification: Notification) => {
  const response = await axiosApi.post("notifications", notification);
  return response.data;
};

export const markNotificationsAsRead = async (senderId: number) => {
  const response = await axiosApi.patch(`notifications`, { senderId });
  return response.data;
};

export const markProductNotificationsAsRead = async () => {
  const response = await axiosApi.patch(`product-notifications`);
  return response.data;
};

export const fetchProductNotifications = async () => {
  const response = await axiosApi.get(`product-notifications`);
  return response.data as ProductNotification[];
};

export const deleteProductNotifications = async () => {
  const response = await axiosApi.delete(`product-notifications`);
  return response.data;
};
