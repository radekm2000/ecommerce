import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { useUserContext } from "../contexts/UserContext";
import { getUserProducts } from "../api/axios";
import { ProductWithImage } from "../types/types";

export const useUserProducts = (): UseQueryResult<
  ProductWithImage[],
  Error
> => {
  const { user } = useUserContext();
  return useQuery({
    queryKey: [`products/${user.id}`, user.id],
    queryFn: () => getUserProducts(user.id),
  });
};
