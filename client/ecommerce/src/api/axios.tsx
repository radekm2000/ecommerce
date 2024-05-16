import axios from "axios";
import {
  AdminNotification,
  Brand,
  Conversation,
  DeleteNotificationDto,
  EditMessageParams,
  ExtendedUserWithProfileAndReviews,
  Feedback,
  FetchedNotifications,
  LoginInput,
  LoginResponseData,
  Notification,
  ProductNotification,
  ProductWithImage,
  ProductWithImageAndUser,
  RegisterInput,
  ReviewFormFields,
  User,
  UserWithAvatar,
} from "../types/types";
import { RequestAccessTokenInterceptor } from "./request-access-token.interceptor";
import { ResponseOAuthInterceptor } from "./response-auth.interceptor";
import { FeedbackFormData } from "../components/FeedbackDialog";
import { ResponseErrorInterceptor } from "./responseError.interceptor";
const LIMIT = 8;
const baseUrl = "http://localhost:3000";
// if (import.meta.env.VITE_NETLIFY == "true") {
//   baseUrl = "https://ecommerce-123.onrender.com";
// } else {
//   baseUrl = "http://localhost:3000";
// }
const ACCESS_TOKEN_KEY = "accessToken";

export const axiosApi = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});
ResponseErrorInterceptor(axiosApi);
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
): Promise<ExtendedUserWithProfileAndReviews> => {
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

export const fetchUserInfo = async (accessToken: string) => {
  const response = await axiosApi.get(`auth/getUserInfo`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data as User;
};

export const fetchPaginatedProducts = async ({
  pageParam,
}: {
  pageParam: number;
}): Promise<{
  data: ProductWithImageAndUser[];
  currentPage: number;
  nextPage: number | null;
}> => {
  try {
    const response = await axiosApi.get(
      `/products/paginated/?limit=${LIMIT}&offset=${pageParam}`
    );
    const data = response.data;

    return {
      data,
      currentPage: pageParam,
      nextPage: data.length === LIMIT ? pageParam + LIMIT : null,
    };
  } catch (error) {
    throw new Error("Failed to fetch items from the server.");
  }
};

export const getUserBasicInfo = async (userId: number) => {
  const response = await axiosApi.get(`users/basic/${userId}`);
  return response.data as UserWithAvatar;
};

export const addReview = async ({
  data,
}: {
  data: ReviewFormFields & { reviewRecipientId: number };
}) => {
  const response = await axiosApi.post(`reviews`, data);
  return response.data;
};

export const fetchUserInfoWhenLostContext = async () => {
  const response = await axiosApi.get("users/profile");
  return response.data as User;
};

export const addAdminNotification = async (dto: AdminNotification) => {
  const response = await axiosApi.post("admin-notifications", dto);
  return response.data;
};

export const getAdminNotifications = async (): Promise<AdminNotification[]> => {
  const response = await axiosApi.get<AdminNotification[]>(
    "admin-notifications"
  );
  return response.data;
};

export const addFeedback = async (dto: FeedbackFormData): Promise<Feedback> => {
  const response = await axiosApi.post<Feedback>("feedbacks", dto);
  return response.data;
};

export const getFeedbacks = async () => {
  const response = await axiosApi.get("feedbacks");
  return response.data as Feedback[];
};

export const addProduct = async (formDataToBackend: FormData) => {
  const response = await axiosApi.post("products/upload", formDataToBackend, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const uploadMessageImage = async (
  formData: FormData,
  userId: number
) => {
  const response = await axiosApi.post(
    `messages/image?receiverId=${userId}`,
    formData
  );
  return response.data;
};

export const deleteMessage = async (messageId: number, userId: number) => {
  const response = await axiosApi.delete(
    `messages/${messageId}?receiverId=${userId}`
  );
  return response.data;
};

export const findUsersBySearchInput = async (
  name: string
): Promise<UserWithAvatar[]> => {
  const response = await axiosApi.get(`users/all/${name}`);
  return response.data;
};

export const editMessage = async (dto: EditMessageParams) => {
  const response = await axiosApi.post(
    `conversations/${dto.conversationId}/messages/${dto.messageId}`,
    dto
  );
  return response.data;
};

export const deleteNotificationsOfConversation = async (
  dto: DeleteNotificationDto
): Promise<void> => {
  const response = await axiosApi.post(`notifications/delete`, dto);
  return response.data;
};

export const logout = async () => {
  await axiosApi.post("auth/logout").catch(() => {});
  const hasAccessToken = !!localStorage.getItem(ACCESS_TOKEN_KEY);
  if (hasAccessToken) {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    window.location.reload();
  }
};

export const fetchUsers = async () => {
  const response = await axiosApi.get<UserWithAvatar[]>("users");
  return response.data;
};

export const grantAdminRoleFor = async (
  userId: number
): Promise<MutationData> => {
  const response = await axiosApi.patch(`users/grantAdmin/${userId}`);
  return response.data;
};
