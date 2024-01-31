import { ProductWithImageAndUser } from "../types/types";

export const IsProductsOwnerMeUser = (
  meUsername: string,
  product: ProductWithImageAndUser
) => {
  return product.user.username === meUsername;
};
