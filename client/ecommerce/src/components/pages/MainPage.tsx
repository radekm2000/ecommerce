import { useUserContext } from "../../contexts/UserContext";
import { useEffect, useRef, useState } from "react";
import { useProfileInfo } from "../../hooks/useProfileInfo";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { useAllProducts } from "../../hooks/useAllProducts";
import { AccountCircle } from "@mui/icons-material";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { Link } from "wouter";
import { NotAuthed } from "../Navbar";

export const MainPage = () => {
  const below1200 = useMediaQuery(1200);
  const below700 = useMediaQuery(700);
  const { user, setUser } = useUserContext();
  const { data: products, isLoading: isProductsDataLoading } = useAllProducts();
  const {
    data: userInfo,
    isLoading: isUserInfoLoading,
    isSuccess,
  } = useProfileInfo(user);
  useEffect(() => {
    if (isSuccess) {
      setUser(userInfo);
    }
  }, [isSuccess, setUser, userInfo]);

  if (isUserInfoLoading) {
    return "userInfo loading...";
  }
  if (isProductsDataLoading) {
    return "products data loading...";
  }
  if (!products) {
    return "No products to display";
  }
  if (!user.id && !user.username) {
    return <NotAuthed />;
  }
  return (
    <Box
      sx={{
        height: "100%",
        minHeight: "calc(100vh - 81px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        maxWidth: "100%",
        marginTop: "200px",
        padding: "15px",
      }}
    >
      <Box
        sx={{
          maxWidth: "1260px",
          width: "100%",
          display: "flex",
        }}
      >
        <Grid container>
          {products.map((product, index) => (
            <Grid
              item
              key={index}
              xs={below700 ? 6 : 4}
              md={below1200 ? 3 : 3}
              lg={below1200 ? 3 : 12 / 5}
              xl={12 / 5}
            >
              <Card
                elevation={0}
                sx={{
                  width: "fit-content",
                  height: "fit-content",
                  padding: "8px",
                }}
              >
                <Link href={`/members/${product.user.id}`}>
                  <CardContent
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-start",
                      cursor: "pointer",
                    }}
                  >
                    {product.user.avatar ? (
                      <Avatar
                        sx={{ width: "24px", height: "24px" }}
                        alt="user-avatar"
                        src={product.user.avatar}
                      />
                    ) : (
                      <AccountCircle
                        sx={{ color: "grey", width: "24px", height: "24px" }}
                      />
                    )}
                    <Typography
                      sx={{
                        fontSize: "12px",
                        color: "#757575",
                        paddingLeft: "8px",
                      }}
                    >
                      {product.user.username}
                    </Typography>
                  </CardContent>
                </Link>
                <Link href={`products/${product.id}-${product.title}`}>
                  <CardMedia
                    alt={product.title}
                    component="img"
                    sx={{ width: "100%", height: "330px", cursor: "pointer" }}
                    image={product.images[0].imageUrl}
                  ></CardMedia>
                </Link>
                <CardContent>
                  <Typography sx={{ fontSize: "14px", color: "#171717" }}>
                    PLN {product.price}.00
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};
