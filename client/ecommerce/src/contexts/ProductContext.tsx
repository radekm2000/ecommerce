import { ReactNode, createContext, useContext, useState } from "react";
import { ProductWithImageAndUser } from "../types/types";

const defaultState: ProductContext = {
  product: {
    brand: "",
    category: "Men",
    description: "",
    id: 0,
    price: 0,
    title: "",
    images: [],
    user: {
      email: "",
      id: 0,
      role: "user",
      username: "",
    },
  },
  setProduct: (product: ProductWithImageAndUser) => {},
} as ProductContext;

export type ProductContext = {
  product: ProductWithImageAndUser;
  setProduct: React.Dispatch<React.SetStateAction<ProductWithImageAndUser>>;
};

export const ProductContext = createContext<ProductContext>(defaultState);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [product, setProduct] = useState<ProductWithImageAndUser>(
    defaultState.product
  );

  return (
    <ProductContext.Provider value={{ product, setProduct }}>
      {children}
    </ProductContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useUserContext = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error("Product context not found");
  }
  return context;
};
