import { useQuery } from "@tanstack/react-query";
import { getFeedbacks } from "../api/axios";

export const useFetchFeedbacks = () => {
  return useQuery({
    queryKey: ["feedbacks"],
    queryFn: getFeedbacks,
  });
};
