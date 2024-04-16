import { Box, Button, Typography } from "@mui/material";
import { DisplayUserInfo } from "../ProductPage/DisplayUserInfo";
import { ProductWithImageAndUser } from "../../types/types";

type ProductProps = {
  product: ProductWithImageAndUser;
  below960: boolean;
  productAuthorId: number;
  userId: number;
  handleCheckout: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => Promise<void>;
  handleDeleteProduct: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => Promise<void>;
};

export const ProductSidebar = (props: ProductProps ) => {
  return (
    <Box
      sx={{
        width: props.below960 ? "100%" : "23%",
        display: "flex",
        padding: "0px 10px",
        flexDirection: "column",
        paddingTop: props.below960 ? "20px" : 0,
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
            USD {props.product.price}.00
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
              {props.product.brand}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", padding: "2px" }}>
            <Typography
              sx={{ fontSize: "13px", color: "#757575", width: "50%" }}
            >
              CATEGORY
            </Typography>
            <Typography sx={{ fontSize: "13px", color: "#757575" }}>
              {props.product.category.toUpperCase()}
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
            width: props.below960 ? "50%" : "100%",
            whiteSpace: "normal !important",
            wordBreak: "break-word",
          }}
        >
          <Typography sx={{ fontSize: "18px" }}>{props.product?.title}</Typography>
          <Typography
            sx={{
              color: "#4D4D4D",
              paddingTop: "8px",
            }}
          >
            {props.product?.description}
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
        {props.productAuthorId === props.userId ? (
          <Button
            variant="outlined"
            onClick={(e) => props.handleDeleteProduct(e)}
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
            onClick={(e) => props.handleCheckout(e)}
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

      <DisplayUserInfo userId={props.productAuthorId} product={props.product} />
    </Box>
  );
};
