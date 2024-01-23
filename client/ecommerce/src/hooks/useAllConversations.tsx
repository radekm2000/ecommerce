import { useQuery } from "@tanstack/react-query";
import { getAllConversations } from "../api/axios";

export const useAllConversations = () => {
  return useQuery({
    queryKey: ["conversations"],
    queryFn: getAllConversations,
  });
};
