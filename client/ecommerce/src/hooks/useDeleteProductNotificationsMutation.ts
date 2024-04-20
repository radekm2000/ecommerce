import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProductNotifications } from "../api/axios";
import toast from "react-hot-toast";
import { ProductNotificationsKeys } from "../api/requests/productNotifications";

export const useDeleteProductNotificationsMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteProductNotifications,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ProductNotificationsKeys.list(),
      });
      toast.success("Notifications cleared");
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });
};
