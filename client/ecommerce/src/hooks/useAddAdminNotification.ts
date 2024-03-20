import { useMutation } from "@tanstack/react-query";
import { addAdminNotification } from "../api/axios";

export const useAddAdminNotification = () => {
  return useMutation({
    mutationKey: ["admin-notifications"],
    mutationFn: addAdminNotification,
    onError: (err) => {
      console.log(err);
    },
  });
};
