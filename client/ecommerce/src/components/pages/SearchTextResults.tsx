import React, { useEffect } from "react";
import { useFindProductBySearchText } from "../../hooks/useFindProductBySearchText";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { Link } from "wouter";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { AccountCircle } from "@mui/icons-material";

const SearchTextResults = () => {
  const below960 = useMediaQuery(960);
  const below1600 = useMediaQuery(1600);
  const below700 = useMediaQuery(700);
  const below1200 = useMediaQuery(1200);
  const searchParams = new URLSearchParams(window.location.search);
  const searchValue = searchParams.get("search_text");

  const { data: products, isLoading: isProductsLoading } =
    useFindProductBySearchText(searchValue);
  if (isProductsLoading) {
    return "isLoading...";
  }
  console.log(products);
  return (
    <Container sx={{ padding: "20px", margin: below1600 ? null : "0px 150px" }}>
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <Box sx={{ width: below960 ? "100%" : "75%" }}>
          <Box sx={{ flexDirection: "column", width: "auto" }}></Box>

          <Box
            sx={{
              flexWrap: "wrap",
              display: "flex",
            }}
          >
            <Grid container>
              {products &&
                products.map((product, index) => (
                  <Grid
                    item
                    key={index}
                    xs={below700 ? 6 : 4}
                    md={below1200 ? 3 : 3}
                    lg={below1200 ? 4 : 3}
                    xl={3}
                    sx={{
                      flex: "0 0 auto",
                    }}
                  >
                    <Card
                      elevation={0}
                      sx={{
                        width: "fit-content",
                        height: "fit-content",
                        padding: "8px",
                      }}
                    >
                      <Link href={`/members/${product.user.id}}`}>
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
                              sx={{
                                color: "grey",
                                width: "24px",
                                height: "24px",
                              }}
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
                      <Link href={`/products/${product.id}-${product.title}`}>
                        <CardMedia
                          alt={product.title}
                          component="img"
                          sx={{
                            width: "100%",
                            height: "330px",
                            cursor: "pointer",
                          }}
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

        <Box sx={{ width: below960 ? "none" : "25%" }}></Box>
      </Box>
    </Container>
  );
};

export default SearchTextResults;
