import { useQuery } from "@tanstack/react-query";
import { Brand } from "../types/types";
import { fetchFilteredProducts } from "../api/axios";

export const useFilteredProducts = (brand: Brand, order: string, category: string) => {
  return useQuery({
    queryKey: ["products", order, brand, category],
    queryFn: () => {
      return fetchFilteredProducts(order, brand, category);
    },
  });
};
