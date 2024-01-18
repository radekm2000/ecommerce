import { useQuery } from "@tanstack/react-query";
import { Brand } from "../types/types";
import { fetchFilteredProducts } from "../api/axios";

export const useFilteredProducts = (brand: Brand, order: string) => {
  return useQuery({
    queryKey: ["products", order, brand],
    queryFn: () => {
      return fetchFilteredProducts(order, brand);
    },
  });
};
