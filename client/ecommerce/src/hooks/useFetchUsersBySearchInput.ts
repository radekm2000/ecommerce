import { useQuery } from "@tanstack/react-query";
import { findUsersBySearchInput } from "../api/axios";

export const useFetchUsersBySearchInput = (name: string) => {
  return useQuery({
    queryKey: ["users", "filter", `${name}`],
    queryFn: () => {
      return findUsersBySearchInput(name);
    },
    enabled: !!name,
  });
};
