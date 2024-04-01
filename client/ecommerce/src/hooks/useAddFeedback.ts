import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addFeedback } from "../api/axios";
import toast from "react-hot-toast";
import { Feedback } from "../types/types";

export const useAddFeedback = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["feedback", "add"],
    mutationFn: addFeedback,
    onSuccess: (data: Feedback) => {
      queryClient.setQueryData(["feedback"], data);
      toast.success("Feedback sent!");
    },
    onError: (err) => {
      console.log(err);
    },
  });
};
