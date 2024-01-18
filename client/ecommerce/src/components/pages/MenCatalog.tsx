import {
  Box,
  Button,
  Container,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import useLocation, { navigate } from "wouter/use-location";
import { useEffect, useState } from "react";
import { axiosApi } from "../../api/axios";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useQuery } from "@tanstack/react-query";
import { useUserContext } from "../../contexts/UserContext";
import { Link } from "wouter";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { Brand } from "../../types/types";
import { BrandButton } from "../filter-buttons/BrandButton";
import { SortByPriceButton } from "../filter-buttons/SortByPriceButton";
import { useFilteredProducts } from "../../hooks/useFilteredProducts";

export const MenCatalog = () => {
  const [location, setLocation] = useLocation();

  const below1600 = useMediaQuery(1600);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [brand, setBrand] = useState<Brand>("");
  const [order, setOrder] = useState("");
  const { user } = useUserContext();
  console.log("chosen brand");
  console.log(brand);

  console.log(user);
  console.log(order);

  const { data: products, isLoading: isProductsLoading } = useFilteredProducts(
    brand,
    order
  );
  // const { data, isLoading } = useQuery({
  //   queryKey: ["products", order],
  //   queryFn: async () => {
  //     if (!order) {
  //       return;
  //     }
  //     try {
  //       const response = await axiosApi.get(`products/men/?order=${order}`);
  //       return response.data;
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   },
  //   enabled: !!order,
  // });

  // if (isLoading) {
  //   return "isLoading...";
  // }
  // console.log(data);
  if (isProductsLoading) {
    return "isLoading...";
  }
  console.log(products);
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
        <Box sx={{ width: "75%" }}>
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
                Men
              </Typography>
            </Link>
            <Typography sx={{ fontSize: "24px", color: "#171717" }}>
              Men
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
              {order && (
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
                  {order}
                </Button>
              )}
              {brand && (
                <Button
                  sx={{
                    padding: "8px 12px",
                    marginLeft: '8px',
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
        </Box>

        <Box sx={{ width: "25%" }}></Box>
      </Box>
    </Container>
  );
};

{
  /* <Button
disableRipple
disableElevation
sx={{
  margin: "0px 8px",
  paddingRight: "12px",
  textTransform: "none",
  cursor: "pointer",
  backgroundColor: isActive ? "#88D4D7" : "initial",
  color: "black",
  border: "1px solid lightgrey",
}}
endIcon={isMenuOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
variant="outlined"
onClick={handleClick}
>
Sort By
</Button>
<Menu
anchorEl={anchorEl}
open={Boolean(anchorEl)}
onClose={handleClose}
>
<MenuItem onClick={() => handleSortBy("price_high_to_low")}>
  Price: High to Low
</MenuItem>
<MenuItem onClick={() => handleSortBy("price_low_to_high")}>
  Price: Low to High
</MenuItem>
</Menu> */
}
