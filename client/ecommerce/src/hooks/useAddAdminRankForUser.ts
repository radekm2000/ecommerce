import { useMutation, useQueryClient } from "@tanstack/react-query";
import { grantAdminRoleFor } from "../api/axios";
import toast from "react-hot-toast";
import { UserWithAvatar } from "../types/types";

type MutationData = {
  message: string;
  updatedUser: UserWithAvatar;
};

export const useAddAdminRankForUser = () => {
  const queryClient = useQueryClient();
  return useMutation<MutationData, Error, number, unknown>({
    mutationFn: grantAdminRoleFor,
    onError: (err) => {
      toast.error(err.message || "Unknown error");
    },
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};
