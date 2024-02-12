import { useQuery } from "@tanstack/react-query";
import { getUserProfileInfo } from "../api/axios";

export const useProfileInfo = (userId: number | undefined) => {
  return useQuery({
    queryKey: ["users/profile"],
    queryFn: getUserProfileInfo,
    enabled: !!userId,
  });
};
