import { useMutation } from "@tanstack/react-query";
import { addReview } from "../api/axios";
import toast from "react-hot-toast";

export const useAddReview = (userId: number) => {
  return useMutation({
    mutationKey: ["addReview", userId],
    mutationFn: addReview,
    onSuccess: () => {
      toast.success("Review added");
    },
    onError: (err) => {
      toast.error("Try again");
    },
  });
};
