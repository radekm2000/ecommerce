import { useQuery } from "@tanstack/react-query";
import { getUserBasicInfo } from "../api/axios";

export const useGetBasicUserInfo = (userId: number) => {
  return useQuery({
    queryKey: ["user", "basic"],
    queryFn: () => {
      return getUserBasicInfo(userId);
    },
    enabled: !!userId,
  });
};
