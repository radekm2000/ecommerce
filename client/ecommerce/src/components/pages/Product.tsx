import { useLocation, useParams } from "wouter";
import { useSingleProduct } from "../../hooks/useSingleProduct";
import { Box, Button, Typography } from "@mui/material";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { useGivenUserProducts } from "../../hooks/useGivenUserProducts";
import { DisplayUserProducts } from "../DisplayUserProducts";
import { ProductWithImageAndUser } from "../../types/types";
import { DisplayUserInfo } from "../ProductPage/DisplayUserInfo";
import { sendProductInfoToCheckout } from "../../api/axios";
import { useStripe } from "@stripe/react-stripe-js";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useUserContext } from "../../contexts/UserContext";
import { useDeleteProduct } from "../../hooks/useDeleteProduct";
import { useAddAdminNotification } from "../../hooks/useAddAdminNotification";
import { ProductSkeleton } from "../skeletons/ProductSkeleton";
import { ProductSidebar } from "../SpecificProduct/ProductSidebar";
import { ReactNode } from "react";
import { ProductMainContent } from "../SpecificProduct/ProductMainContent";

const Container = ({ children }: { children: ReactNode }) => {
  return (
    <Box
      sx={{
        backgroundColor: "rgba(37,44,51,0.08)",
        display: "flex",
        height: "calc(100vh -81px)",
        padding: "16px 30px",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {children}
    </Box>
  );
};

export const Product = () => {
  const stripe = useStripe();
  const { user } = useUserContext();
  const below960 = useMediaQuery(960);
  const below800 = useMediaQuery(800);
  const params = useParams();
  const [, setLocation] = useLocation();
  const productId = params?.productId;
  const {
    data: product,
    isLoading,
    isFetching,
  } = useSingleProduct(parseInt(productId!));
  const mutation = useMutation({
    mutationFn: sendProductInfoToCheckout,
    mutationKey: ["stripe"],
    onSuccess: (data) => {
      window.location.href = data.url;
    },
    onError: (err) => {
      console.log(err);
    },
  });
  const adminNotificationMutation = useAddAdminNotification();
  const { mutate: mutateAdminNotification } = adminNotificationMutation;
  const { mutate: deleteProductMutate } = useDeleteProduct(product?.id);
  const { mutate } = mutation;
  const { data: userProducts, isLoading: isUserProductsLoading } =
    useGivenUserProducts(product?.user.id, product);
  const productAuthorId = product?.user.id;

  if (isLoading || isUserProductsLoading || isFetching) {
    return <ProductSkeleton />;
  }
  if (!product || !productAuthorId) {
    return "Product not found";
  }

  const productsWithoutMainOne = userProducts?.filter(
    (userProduct) => userProduct.id != product?.id
  );

  const handleCheckout = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (!stripe) {
      return;
    }
    mutate(product);
  };

  const handleDeleteProduct = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    deleteProductMutate(product.id);

    mutateAdminNotification({
      username: user.username,
      action: `deleted product ${product.title}`,
      createdAt: "",
    });
  };
  return (
    <Container>
      <Box
        sx={{
          width: "1260px",
          display: "flex",
          flexDirection: below960 ? "column" : "row",
        }}
      >
        <ProductMainContent product={product} userProducts={userProducts} />
        <ProductSidebar
          below960={below960}
          handleCheckout={handleCheckout}
          handleDeleteProduct={handleDeleteProduct}
          product={product}
          productAuthorId={productAuthorId}
          userId={user.id}
        />

        <Box
          sx={{
            display: below960 ? "inline" : "none",
            width: "100%",
            marginLeft: "10px",
          }}
        >
          <Box
            sx={{
              visibility: below960 ? "visible" : "hidden",
              marginTop: "24px",
              padding: "20px 16px",
              backgroundColor: "white",
            }}
          >
            <Typography
              sx={{
                color: "#757575",
                fontSize: "14px",
                borderBottom: "1px solid rgba(23, 23, 23, 0.15)",
                paddingBottom: "5px",
              }}
            >
              Member's items ({userProducts?.length})
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: below960 ? "inline" : "none",
            marginTop: "24px",
            marginLeft: "15px",
          }}
        >
          <DisplayUserProducts
            setLocation={setLocation}
            products={productsWithoutMainOne as ProductWithImageAndUser[]}
          />
        </Box>
      </Box>
    </Container>
  );
};
