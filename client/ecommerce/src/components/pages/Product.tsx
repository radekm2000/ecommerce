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
import { useMutation } from "@tanstack/react-query";
import { useUserContext } from "../../contexts/UserContext";
import { useEffect, useState } from "react";
import { useDeleteProduct } from "../../hooks/useDeleteProduct";

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
  const { mutate: deleteProductMutate } = useDeleteProduct(product?.id);
  const { mutate } = mutation;
  const { data: userProducts, isLoading: isUserProductsLoading } =
    useGivenUserProducts(product?.user.id, product);
  const productAuthorId = product?.user.id;
  if (isLoading) {
    return "isLoading...";
  }
  if (!product) {
    return;
  }
  if (isFetching) {
    return "data is fetching...";
  }
  if (isUserProductsLoading) {
    return "isUserProductsLoading...";
  }

  const productsWithoutMainOne = userProducts?.filter(
    (userProduct) => userProduct.id != product?.id
  );
  if (!productAuthorId) {
    return;
  }
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
  };
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
      <Box
        sx={{
          width: "1260px",
          display: "flex",
          flexDirection: below960 ? "column" : "row",
        }}
      >
        <Box
          sx={{
            width: below960 ? "100%" : "77%",
            display: "flex",
            padding: "0px 10px",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "20px",
            height:
              userProducts?.length == 1 ? (below800 ? "auto" : "78vh") : "",
          }}
        >
          <Box
            component="img"
            src={product?.images[0].imageUrl}
            sx={{ height: "100%", alignSelf: "center" }}
          ></Box>
          <Box
            sx={{
              display: below960 ? "none" : "inline",
              marginTop: "40px",
              padding: "20px 16px",
              backgroundColor: "white",
              width: "96%",
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
          <Box sx={{ display: below960 ? "none" : "inline" }}>
            <DisplayUserProducts
              setLocation={setLocation}
              products={productsWithoutMainOne as ProductWithImageAndUser[]}
            />
          </Box>
        </Box>
        <Box
          sx={{
            width: below960 ? "100%" : "23%",
            display: "flex",
            padding: "0px 10px",
            flexDirection: "column",
            paddingTop: below960 ? "20px" : 0,
            gap: "15px",
          }}
        >
          <Box
            sx={{
              width: "100%",
              flexDirection: "column",
              display: "flex",
              backgroundColor: "white",
              padding: "16px",
              maxHeight: "50%",
            }}
          >
            <Box
              sx={{
                width: "auto",
                display: "flex",
                borderBottom: "1px solid rgba(23, 23, 23, 0.15)",
                paddingBottom: "5px",
                marginBottom: "8px",
              }}
            >
              <Typography sx={{ fontSize: "22px" }}>
                USD {product?.price}.00
              </Typography>
            </Box>
            <Box
              sx={{
                paddingBottom: "5px",
                borderBottom: "1px solid rgba(23, 23, 23, 0.15)",
              }}
            >
              <Box sx={{ display: "flex", padding: "2px" }}>
                <Typography
                  sx={{ fontSize: "13px", color: "#757575", width: "50%" }}
                >
                  BRAND
                </Typography>
                <Typography sx={{ fontSize: "13px", color: "#757575" }}>
                  {product?.brand}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", padding: "2px" }}>
                <Typography
                  sx={{ fontSize: "13px", color: "#757575", width: "50%" }}
                >
                  CATEGORY
                </Typography>
                <Typography sx={{ fontSize: "13px", color: "#757575" }}>
                  {product?.category.toUpperCase()}
                </Typography>
              </Box>
            </Box>
            <Box
              component="div"
              sx={{
                marginTop: "20px",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "flex-start",
                width: below960 ? "50%" : "100%",
                whiteSpace: "normal !important",
                wordBreak: "break-word",
              }}
            >
              <Typography sx={{ fontSize: "18px" }}>
                {product?.title}
              </Typography>
              <Typography
                sx={{
                  color: "#4D4D4D",
                  paddingTop: "8px",
                }}
              >
                {product?.description}
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              width: "100%",
              padding: "0px 16px",
            }}
          >
            {productAuthorId === user.id ? (
              <Button
                variant="outlined"
                onClick={(e) => handleDeleteProduct(e)}
                sx={{
                  display: "flex",
                  width: "100%",
                  textTransform: "none",
                  border: "1px solid red",
                  color: "red",
                  backgroundColor: "white",
                  justifyContent: "center",
                  alignItems: "center",
                  "&:hover": {
                    border: "1px solid red",
                    backgroundColor: "white",
                  },
                }}
              >
                Delete
              </Button>
            ) : (
              <Button
                onClick={(e) => handleCheckout(e)}
                sx={{
                  display: "flex",
                  width: "100%",
                  textTransform: "none",
                  color: "white",
                  backgroundColor: "#007782",
                  justifyContent: "center",
                  alignItems: "center",
                  "&:hover": {
                    backgroundColor: "#007782",
                  },
                }}
              >
                Buy now
              </Button>
            )}
          </Box>

          <DisplayUserInfo userId={productAuthorId} product={product} />
        </Box>

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
    </Box>
  );
};
