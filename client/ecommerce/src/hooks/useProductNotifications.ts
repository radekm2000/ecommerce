import { useQuery } from "@tanstack/react-query";
import { fetchProductNotifications } from "../api/axios";

export const useProductNotifications = (userId: number) => {
  return useQuery({
    queryKey: [`productNotifications`],
    queryFn: fetchProductNotifications,
    enabled: !!userId,
  });
};
