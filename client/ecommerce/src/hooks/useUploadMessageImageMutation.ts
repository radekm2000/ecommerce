import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadMessageImage } from "../api/axios";
import toast from "react-hot-toast";

export const useUploadMessageImageMutation = (userId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formData: FormData) => {
      return uploadMessageImage(formData, userId);
    },
    onSuccess: () => {
      toast.success("Image uploaded!");
      queryClient.invalidateQueries({
        queryKey: [`conversations/users/${userId}`],
      });
    },
    onError: (err) => {
      console.log(err);
      toast.error(err.message || "Something went wrong");
    },
  });
};
