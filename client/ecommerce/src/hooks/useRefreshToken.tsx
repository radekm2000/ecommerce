import { axiosApi } from "../api/axios";

export const useRefreshToken = async (): Promise<string | undefined> => {
  try {
    const response = await axiosApi.get("auth/refresh");
    const accessToken = response.data.accessToken as string;
    return accessToken;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};
