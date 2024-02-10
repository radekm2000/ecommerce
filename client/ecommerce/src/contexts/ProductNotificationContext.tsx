import { ReactNode, createContext, useContext, useState } from "react";
import { ProductNotification } from "../types/types";

const defaultState = {
  productNotifications: [],
  setProductNotifications: (productNotifications: ProductNotification[]) => [],
} as ProductNotificationsChatContext;

export type ProductNotificationsChatContext = {
  productNotifications: ProductNotification[];
  setProductNotifications: React.Dispatch<
    React.SetStateAction<ProductNotification[]>
  >;
};

export const ProductNotificationContext =
  createContext<ProductNotificationsChatContext>(defaultState);

export const ProductNotificationProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [productNotifications, setProductNotifications] = useState<
    ProductNotification[]
  >([]);

  return (
    <ProductNotificationContext.Provider
      value={{ productNotifications, setProductNotifications }}
    >
      {children}
    </ProductNotificationContext.Provider>
  );
};

export const useProductNotificationsContext = () => {
  const context = useContext(ProductNotificationContext);
  if (context === undefined) {
    throw new Error("productNotificationContext must be used within provider");
  }
  return context;
};
