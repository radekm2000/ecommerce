import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProductNotifications } from "../api/axios";
import toast from "react-hot-toast";

export const useDeleteProductNotificationsMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["productNotifications", "delete"],
    mutationFn: deleteProductNotifications,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["productNotifications"] });
      toast.success("Notifications cleared");
    },
    onError: (err) => {
      toast.error("Something went wrong");
    },
  });
};
