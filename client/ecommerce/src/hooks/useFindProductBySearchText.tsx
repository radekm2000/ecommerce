/* eslint-disable react-hooks/rules-of-hooks */
import { useQuery } from "@tanstack/react-query";
import { getFilteredProductsBySearchText } from "../api/axios";

export const useFindProductBySearchText = (searchText: string | null) => {
  return useQuery({
    queryKey: ["products", "filter", searchText],
    queryFn: () => {
      return getFilteredProductsBySearchText(searchText);
    },
    enabled: !!searchText,
  });
};
