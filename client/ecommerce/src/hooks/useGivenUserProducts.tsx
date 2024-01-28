import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getGivenUserProducts } from "../api/axios";
import { ProductWithImageAndUser } from "../types/types";

export const useGivenUserProducts = (userId: number | undefined, product: ProductWithImageAndUser | undefined) => {
  return useQuery({
    queryKey: ["products", "user", userId],
    queryFn: () => {
      return getGivenUserProducts(userId!);
    },
    enabled: !!product
  });
};
