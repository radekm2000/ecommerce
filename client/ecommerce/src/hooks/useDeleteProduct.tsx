import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProduct } from "../api/axios";
import toast from "react-hot-toast";
import { useLocation } from "wouter";
import { ProductWithImageAndUser } from "../types/types";

export const useDeleteProduct = (productId: number | undefined) => {
  const [, setLocation] = useLocation();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteProduct,
    mutationKey: ["product", productId, "delete"],
    onSuccess: () => {
      
      toast.success("Product deleted");
      setLocation("/");
      queryClient.setQueryData(
        ["products"],
        (oldData: ProductWithImageAndUser[]) => {
          if (!oldData) return null;

          const updatedData = oldData.filter(
            (product) => product.id !== productId
          );

          return updatedData;
        }
      );
    },
    onError: (err) => {
      console.log(err);
    },
  });
};
