import { useQuery } from "@tanstack/react-query";
import { fetchProductNotifications } from "../api/axios";
import { ProductNotificationsKeys } from "../api/requests/productNotifications";

export const useProductNotifications = (userId: number) => {
  return useQuery({
    queryKey: ProductNotificationsKeys.list(),
    queryFn: fetchProductNotifications,
    enabled: !!userId,
  });
};
