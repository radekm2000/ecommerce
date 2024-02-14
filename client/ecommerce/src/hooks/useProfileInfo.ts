import { useQuery } from "@tanstack/react-query";
import { getUserProfileInfo } from "../api/axios";
import { User } from "../types/types";

export const useProfileInfo = (user: User) => {
  return useQuery({
    queryKey: ["users/profile"],
    queryFn: getUserProfileInfo,
    enabled: !user.username,
  });
};
