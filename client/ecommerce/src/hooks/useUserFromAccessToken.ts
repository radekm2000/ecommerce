import { useQuery } from "@tanstack/react-query";
import { fetchUserInfo } from "../api/axios";

export const useUserFromAccessToken = (accessToken: string) => {
  return useQuery({
    queryKey: [`user`, `info`],
    queryFn: () => {
      return fetchUserInfo(accessToken);
    },
    enabled: !!accessToken,
  });
};
