import { useParams } from "wouter";
import { useSingleProduct } from "../../hooks/useSingleProduct";
import { Box, Typography } from "@mui/material";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { useGivenUserProducts } from "../../hooks/useGivenUserProducts";
import { DisplayUserProducts } from "../DisplayUserProducts";
import { ProductWithImageAndUser } from "../../types/types";

export const Product = () => {
  const below960 = useMediaQuery(960);
  const below1600 = useMediaQuery(1600);
  const params = useParams();
  const productId = params?.productId;
  const {
    data: product,
    isLoading,
    isFetching,
  } = useSingleProduct(parseInt(productId!));

  const { data: userProducts, isLoading: isUserProductsLoading } =
    useGivenUserProducts(product?.user.id, product);
  if (isLoading) {
    return "isLoading...";
  }
  if (isFetching) {
    return "data is fetching...";
  }
  if (isUserProductsLoading) {
    return "isUserProductsLoading...";
  }
  console.log(product);

  const productsWithoutMainOne = userProducts?.filter(
    (userProduct) => userProduct.id != product?.id
  );
  console.log(productsWithoutMainOne);
  return (
    <Box
      sx={{
        backgroundColor: "rgba(37,44,51,0.08)",
        display: "flex",
        minHeight: "calc(100vh -81px)",
        height: "100%",
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
            alignItems: "center",
            gap: "20px",
          }}
        >
          <Box
            component="img"
            src={product?.images[0].imageUrl}
            sx={{ height: "auto" }}
          ></Box>
          <Box
            sx={{
              visibility: below960 ? "hidden" : "visible",
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
              products={productsWithoutMainOne as ProductWithImageAndUser[]}
            />
          </Box>
        </Box>
        <Box
          sx={{
            width: below960 ? "100%" : "23%",
            display: "flex",
            padding: "0px 10px",
            paddingTop: below960 ? "20px" : 0,
          }}
        >
          <Box
            sx={{
              width: "100%",
              flexDirection: "column",
              display: "flex",
              backgroundColor: "white",
              padding: "16px",
              height: '25%'
              
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
            <Box component='div'
              sx={{
                marginTop: "20px",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "flex-start",
                width: below960 ? "50%" : "100%",
                whiteSpace: 'normal !important',
                wordBreak: 'break-word'
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
            <Box
              sx={{
                visibility: below960 ? "visible" : "hidden",
                marginTop: "24px",
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
            <Box sx={{ visibility: below960 ? "visible" : "hidden" }}>
              <DisplayUserProducts
                products={productsWithoutMainOne as ProductWithImageAndUser[]}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
