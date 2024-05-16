import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editUserRole } from "../api/axios";
import toast from "react-hot-toast";
import { EditRole, UserWithAvatar } from "../types/types";

type MutationData = {
  message: string;
  updatedUser: UserWithAvatar;
};

export const useEditUserRole = () => {
  const queryClient = useQueryClient();
  return useMutation<MutationData, Error, EditRole, unknown>({
    mutationFn: editUserRole,
    onError: (err) => {
      toast.error(err.message || "Unknown error");
    },
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};
