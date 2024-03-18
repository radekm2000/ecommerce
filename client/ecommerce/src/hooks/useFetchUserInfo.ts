import { useQuery } from "@tanstack/react-query";
import { fetchUserInfoWhenLostContext } from "../api/axios";

export const useFetchUserInfo = (userId: number) => {
  return useQuery({
    queryKey: ["user", "me"],
    queryFn: fetchUserInfoWhenLostContext,
    enabled: userId === 0,
  });
};
