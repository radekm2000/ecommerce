import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteMessage } from "../api/axios";
import toast from "react-hot-toast";
import { Conversation } from "../types/types";

export const useDeleteMessageMutation = (userId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (messageId: number) => deleteMessage(messageId, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`conversations/users/${userId}`],
      });
      toast.success("Message deleted!");
    },
    onError: (err) => {
      toast.error(err.message || "Something went wrong");
    },
  });
};
