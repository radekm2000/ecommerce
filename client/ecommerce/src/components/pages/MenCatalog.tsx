import { Box, Button, Menu, MenuItem, Typography } from "@mui/material";
import { navigate } from "wouter/use-location";
import { useEffect, useState } from "react";
import { axiosApi } from "../../api/axios";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useQuery } from "@tanstack/react-query";
export const MenCatalog = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [order, setOrder] = useState("");
  console.log(order);
  const { data, isLoading } = useQuery({
    queryKey: ["products", order],
    queryFn: async () => {
      if (!order) {
        return;
      }
      try {
        const response = await axiosApi.get(`products/men/?order=${order}`);
        return response.data;
      } catch (error) {
        console.log(error);
      }
    },
    enabled: !!order,
  });

  if (isLoading) {
    return "isLoading...";
  }
  console.log(data);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setIsMenuOpen(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setIsMenuOpen(false);
  };

  const handleSortBy = (order: string) => {
    // Tutaj możesz dodać logikę do sortowania
    setOrder(order);
    console.log(`Sorting by: ${order}`);
    handleClose();
    navigate(`/catalog/men/?order=${order}`);
  };

  return (
    <div>
      <Button
        sx={{ cursor: "pointer" }}
        endIcon={isMenuOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        variant="outlined"
        onClick={handleClick}
      >
        Sort By
      </Button>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={() => handleSortBy("price_high_to_low")}>
          Price: High to Low
        </MenuItem>
        <MenuItem onClick={() => handleSortBy("price_low_to_high")}>
          Price: Low to High
        </MenuItem>
      </Menu>
    </div>
  );
};
