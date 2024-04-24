import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import useLocation from "wouter/use-location";
import { useEffect, useState } from "react";
import { useUserContext } from "../../contexts/UserContext";
import { Link } from "wouter";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { Brand } from "../../types/types";
import { BrandButton } from "../filter-buttons/BrandButton";
import { SortByPriceButton } from "../filter-buttons/SortByPriceButton";
import { useFilteredProducts } from "../../hooks/useFilteredProducts";
import { AccountCircle } from "@mui/icons-material";
import { CatalogSkeleton } from "../skeletons/CatalogSkeleton";

export const WomenCatalog = () => {
  const below1200 = useMediaQuery(1200);
  const below960 = useMediaQuery(960);
  const [location, setLocation] = useLocation();
  const below700 = useMediaQuery(700);
  const below1600 = useMediaQuery(1600);
  const [brand, setBrand] = useState<Brand>("");
  const [order, setOrder] = useState("");
  const { user } = useUserContext();
  const [category] = useState<string>("Women");
  useEffect(() => {
    const params = new URLSearchParams();
    if (order) params.set("order", order);
    if (brand) params.set("brand", brand);

    const queryString = params.toString();
    const url = `${location}${queryString ? `?${queryString}` : ""}`;
    setLocation(url);
  }, [brand, order, setLocation, location]);

  const { data: products, isLoading: isProductsLoading } = useFilteredProducts(
    brand,
    order,
    category
  );

  if (isProductsLoading) {
    return <CatalogSkeleton />;
  }
  if (!products) {
    return <CatalogSkeleton />;
  }
  const handlePriceSelected = (price: string) => {
    setOrder(price);
  };

  const clearFilters = () => {
    setOrder("");
    setBrand("");
  };

  const handleBrand = (brand: string) => {
    setBrand(brand as Brand);
  };

  return (
    <Container sx={{ padding: "20px", margin: below1600 ? null : "0px 150px" }}>
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <Box sx={{ width: below960 ? "100%" : "75%" }}>
          <Box sx={{ flexDirection: "column", width: "auto" }}>
            <Link to="/catalog/men">
              <Typography
                sx={{
                  fontSize: "14px",
                  color: "#757575",
                  marginBottom: "8px",
                  textDecoration: "underline",
                }}
              >
                Women
              </Typography>
            </Link>
            <Typography sx={{ fontSize: "24px", color: "#171717" }}>
              Women
            </Typography>
          </Box>
          <Box
            sx={{
              borderBottom: "1px solid rgba(23, 23, 23, 0.15)",
              paddingBottom: "15px",
              flexShrink: 2,
            }}
          ></Box>
          <Box
            sx={{
              marginTop: "12px",
              paddingBottom: "12px",
              flexWrap: "wrap",
              borderBottom: "1px solid rgba(23, 23, 23, 0.15)",
            }}
          >
            <SortByPriceButton onPriceSelected={handlePriceSelected} />
            <BrandButton onBrandSelected={handleBrand} />
            <Box
              sx={{
                padding: "8px 12px",
                display: "flex",
                alignItems: "center",
              }}
            >
              {category && (
                <Button
                  sx={{
                    padding: "8px 12px",
                    backgroundColor: "#F2F2F2",
                    fontSize: "14px",
                    color: "#171717",
                    borderRadius: "3996px",
                    border: "1px solid #0000",
                    textTransform: "none",
                  }}
                >
                  {category}
                </Button>
              )}
              {order && (
                <Button
                  sx={{
                    padding: "8px 12px",
                    marginLeft: "8px",
                    backgroundColor: "#F2F2F2",
                    fontSize: "14px",
                    color: "#171717",
                    borderRadius: "3996px",
                    border: "1px solid #0000",
                    textTransform: "none",
                  }}
                >
                  {order}
                </Button>
              )}
              {brand && (
                <Button
                  sx={{
                    padding: "8px 12px",
                    marginLeft: "8px",
                    backgroundColor: "#F2F2F2",
                    fontSize: "14px",
                    color: "#171717",
                    borderRadius: "3996px",
                    textTransform: "none",
                  }}
                >
                  {brand}
                </Button>
              )}
              {order || brand ? (
                <Button
                  onClick={clearFilters}
                  sx={{
                    color: "#007782",
                    textTransform: "none",
                    alignItems: "flex-end",
                    fontSize: "12px",
                    border: "none",
                    maxWidth: "83px",
                    maxHeight: "21px",
                    marginLeft: "auto",
                    padding: "0px 5px",
                  }}
                >
                  Clear filters
                </Button>
              ) : null}
            </Box>
          </Box>
          <Box
            sx={{
              flexWrap: "wrap",
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
