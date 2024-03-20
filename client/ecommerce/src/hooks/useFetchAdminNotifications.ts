import { useQuery } from "@tanstack/react-query";
import { getAdminNotifications } from "../api/axios";

export const useFetchAdminNotifications = () => {
  return useQuery({
    queryKey: ["admin-notifications"],
    queryFn: getAdminNotifications,
  });
};
