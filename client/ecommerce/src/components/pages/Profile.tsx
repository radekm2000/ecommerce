import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";

import { useUserContext } from "../../contexts/UserContext";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { useUserProducts } from "../../hooks/useUserProducts";
import { Link } from "wouter";
import { ProfileInfo } from "../ProfileInfo";
export const Profile = () => {
  const below750 = useMediaQuery(750);

  const { data: products, isLoading } = useUserProducts();

  if (isLoading) {
    return "isLoading...";
  }
  if (!products) {
    return "No products";
  }
  return (
    <Box
      sx={{
        height: "100%",
        minHeight: "calc(100vh - 81px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
        maxWidth: "100%",
      }}
    >
      <ProfileInfo />
      <Box
        sx={{
          maxWidth: "1260px",
          width: "100%",
          display: "flex",
          padding: "20x",
        }}
      >
        <Typography
          sx={{ fontSize: "16px", color: "#171717", padding: "16px" }}
        >
          {products.length} items
        </Typography>
      </Box>
      <Box
        sx={{
          maxWidth: "1260px",
          width: "100%",
          display: "flex",
          padding: "20x",
        }}
      >
        <Grid container spacing={2}>
          {products.map((product, index) => (
            <Grid xs={6} sm={below750 ? 6 : 4} md={4} lg={3} key={index} item>
              {product.images.length > 0 && (
                <Card
                  elevation={0}
                  sx={{
                    maxWidth: below750 ? "340px" : "350px",
                    width: "100%",
                    padding: "8px, 16px",
                    cursor: "pointer",
                  }}
                >
                  <Link href={`products/${product.id}-${product.title}`}>
                    <CardMedia
                      component="img"
                      alt={product.title}
                      sx={{
                        width: "100%",
                        height: "340px",
                        objectFit: "cover",
                      }}
                      image={product.images[0].imageUrl}
                    />
                  </Link>
                  <CardContent>
                    <Typography sx={{ fontSize: "14px" }} component="div">
                      PLN {product.price}.00
                    </Typography>
                  </CardContent>
                </Card>
              )}
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};
