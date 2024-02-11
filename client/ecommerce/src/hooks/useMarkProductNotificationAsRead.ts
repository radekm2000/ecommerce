import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useUserContext } from "../contexts/UserContext";
import { markProductNotificationsAsRead } from "../api/axios";

export const useMarkProductNotificationAsRead = () => {
  const { user } = useUserContext();
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["productNotifications", "update", user.id],
    mutationFn: markProductNotificationsAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["productNotifications"] });
    },
    onError: (err) => {
      console.log(err);
    },
  });
};
