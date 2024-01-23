import { useQuery } from "@tanstack/react-query";
import { getAllUserConversations } from "../api/axios";

export const useUserConversations = (userId: number) => {
  return useQuery({
    queryKey: [`conversations/users/${userId}`],
    queryFn: async () => {
      return getAllUserConversations(userId);
    },
    enabled: !!userId,
  });
};
