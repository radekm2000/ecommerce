import { useQuery } from "@tanstack/react-query";
import { getProduct } from "../api/axios";

export const useSingleProduct = (productId: number) => {
  return useQuery({
    queryKey: ["products", productId],
    queryFn: () => {
      return getProduct(productId);
    },
    enabled: !!productId,
  });
};
