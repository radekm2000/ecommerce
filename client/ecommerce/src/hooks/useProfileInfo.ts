import { useQuery } from "@tanstack/react-query";
import { getUserProfileInfo } from "../api/axios";

export const useProfileInfo = () => {
  return useQuery({
    queryKey: ["users/profile"],
    queryFn: getUserProfileInfo,
  });
};
