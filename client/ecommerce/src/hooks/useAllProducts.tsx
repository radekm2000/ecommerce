import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../api/axios";

export const useAllProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });
};
