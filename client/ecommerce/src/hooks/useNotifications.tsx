import { useQuery } from "@tanstack/react-query";
import { fetchNotifications } from "../api/axios";

export const useNotifications = (userId: number | undefined) => {
  return useQuery({
    queryKey: ["notifications"],
    queryFn: fetchNotifications,
    enabled: !!userId,
  });
};
