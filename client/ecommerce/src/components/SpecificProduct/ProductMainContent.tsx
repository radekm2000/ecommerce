import { Box, Typography } from "@mui/material";
import { ProductWithImageAndUser } from "../../types/types";
import { DisplayUserProducts } from "../DisplayUserProducts";
import { useMediaQuery } from "../../hooks/useMediaQuery";

type ProductMainContentProps = {
  product: ProductWithImageAndUser;
  userProducts: ProductWithImageAndUser[] | undefined;
};

export const ProductMainContent = (props: ProductMainContentProps) => {
  const below960 = useMediaQuery(960);
  const below800 = useMediaQuery(800);

  const productsWithoutMainOne = props.userProducts?.filter(
    (p) => p.id != props.product.id
  );
  return (
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
          props.userProducts?.length == 1 ? (below800 ? "auto" : "auto") : "",
      }}
    >
      <Box
        component="img"
        src={props.product?.images[0].imageUrl}
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
          Member's items ({props.userProducts?.length})
        </Typography>
      </Box>
      <Box sx={{ display: below960 ? "none" : "inline" }}>
        <DisplayUserProducts
          products={productsWithoutMainOne as ProductWithImageAndUser[]}
        />
      </Box>
    </Box>
  );
};
