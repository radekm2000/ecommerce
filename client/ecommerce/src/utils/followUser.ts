import { useMutation } from "@tanstack/react-query";
import { followUser } from "../api/axios";

export const useFollowUser = (userId: number | undefined) => {
  return useMutation({
    mutationKey: [`followers/follow/${userId}`],
    mutationFn: (userId: number) => {
      return followUser(userId);
    },
    onSuccess: () => {
      console.log("user followed");
    },
    onError: (err) => {
      console.log(err);
    },
  });
};
