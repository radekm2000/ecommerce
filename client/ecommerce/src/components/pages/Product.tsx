import { useParams } from "wouter";
import { useUserProducts } from "../../hooks/useUserProducts";

export const Product = () => {
  const params = useParams();
  const productId = params?.productId;
  const { data: products, isLoading } = useUserProducts();
  if (!productId) {
    return;
  }
  if (isLoading) {
    return "isLoading...";
  }
  if (!products) {
    return;
  }
  const product = products.find(
    (product) => product.id === parseInt(productId)
  );
  console.log(product);

  return <div>Product</div>;
};
