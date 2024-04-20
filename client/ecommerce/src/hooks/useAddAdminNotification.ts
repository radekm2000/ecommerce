import { useMutation } from "@tanstack/react-query";
import { addAdminNotification } from "../api/axios";

export const useAddAdminNotification = () => {
  return useMutation({
    mutationKey: ["admin-notifications"],
    mutationFn: addAdminNotification,
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (err) => {
      console.log(err);
    },
  });
};
