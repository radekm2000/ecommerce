import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProduct } from "../api/axios";
import toast from "react-hot-toast";
import { useLocation } from "wouter";

export const useDeleteProduct = (productId: number | undefined) => {
  const [, setLocation] = useLocation();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteProduct,
    mutationKey: ["product", productId, "delete"],
    onSuccess: () => {
      toast.success("Product deleted");
      queryClient.invalidateQueries({ queryKey: ["products"] });
      setLocation("/");
    },
    onError: (err) => {
      console.log(err);
    },
  });
};
