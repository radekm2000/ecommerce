import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNotificationsOfConversation } from "../api/axios";
import toast from "react-hot-toast";

export const useDeleteNotificationsOfConversation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteNotificationsOfConversation,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notifications"],
      });
    },
    onError: (err) => {
      toast.error(err.message || "Something went wrong");
    },
  });
};
