import { useQuery } from "@tanstack/react-query";
import { getUserData } from "../api/axios";

export const useUserInfo = (userId: number) => {
  return useQuery({
    queryKey: [`users/${userId}`],
    queryFn: () => {
      return getUserData(userId);
    },
  });
};
