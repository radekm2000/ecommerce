import { AccountCircle } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import React from "react";
import { ProductWithImageAndUser } from "../types/types";
import { useMediaQuery } from "../hooks/useMediaQuery";

export const DisplayUserProducts = ({
  products,
}: {
  products: ProductWithImageAndUser[];
}) => {
    const below600 = useMediaQuery(600)
  const below700 = useMediaQuery(700);
  const below1050 = useMediaQuery(1050);
  const below1200 = useMediaQuery(1200);
  const below1600 = useMediaQuery(1600)
  return (
    <Box
      sx={{
        flexWrap: "wrap",
        display: "flex",
      }}
    >
      <Grid spacing={1}  container sx={{ backgroundColor: "rgba(37,44,51,0.00)" }}>
        {products.map((product, index) => (
          <Grid
            item
            key={index}
            sm={below600 ? 6: 6}
            xs={below700 ? 6 : 4}
            md={below1050 ? 4 : 3}
            lg={below1200 ? 4 : 3}
            sx={{
              flexBasis: below1600 ? 'auto' : 'calc(25% - 1px)'
            }}
          >
            <Card
              square={true}
              elevation={0}
              sx={{
                width: "fit-content",
                height: "fit-content",
              }}
            >
              <Link underline='none' href={`/members/${product.user.id}}`}>
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
              <Link href={`products/${product.id}-${product.title}`}>
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
              <CardContent
                sx={{ overflow: "hidden", textOverflow: "ellipsis" }}
              >
                <Typography sx={{ fontSize: "14px", color: "#171717" }}>
                  PLN {product.price}.00
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
