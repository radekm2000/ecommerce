import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteMessage } from "../api/axios";
import toast from "react-hot-toast";

export const useDeleteMessageMutation = (userId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (messageId: number) => deleteMessage(messageId, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`conversations/users/${userId}`],
      });
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
      toast.success("Message deleted!");
    },
    onError: (err) => {
      toast.error(err.message || "Something went wrong");
    },
  });
};
