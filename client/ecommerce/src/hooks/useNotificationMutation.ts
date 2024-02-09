import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addNotification } from "../api/axios";

export const useNotificationMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["addNotification"],
    mutationFn: addNotification,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
    onError: (err) => {
      console.log(err);
    },
  });
};
