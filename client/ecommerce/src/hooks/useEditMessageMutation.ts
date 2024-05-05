import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editMessage } from "../api/axios";
import { EditMessageParams } from "../types/types";
import toast from "react-hot-toast";

export const useEditMessageMutation = (userId: number) => {
  const queryClient = useQueryClient();
  return useMutation<unknown, Error, EditMessageParams>({
    mutationFn: editMessage,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`conversations/users/${userId}`],
      });
      toast.success("Message edited!");
    },
    onError: (err) => {
      toast.error(err.message || "Something went wrong");
    },
  });
};
