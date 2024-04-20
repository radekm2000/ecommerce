import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useUserContext } from "../contexts/UserContext";
import { markProductNotificationsAsRead } from "../api/axios";
import { ProductNotificationsKeys } from "../api/requests/productNotifications";

export const useMarkProductNotificationAsRead = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: markProductNotificationsAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ProductNotificationsKeys.list(),
      });
    },
    onError: (err) => {
      console.log(err);
    },
  });
};
