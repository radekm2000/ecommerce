import { Button, Menu, MenuItem } from "@mui/material";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";
import { Brand } from "../../types/types";

const MenuItems = [
  "Zara",
  "Reserved",
  "Nike",
  "House",
  "Adidas",
  "4F",
  "Calvin Klein",
];

export const BrandButton = ({
  onBrandSelected,
}: {
  onBrandSelected: (brand: Brand) => void;
}) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setIsActive(true);
    setAnchorEl(event.currentTarget);
    setIsMenuOpen(true);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setIsMenuOpen(false);
    setIsActive(!isActive);
  };

  const handleBrand = (brand: Brand) => {
    onBrandSelected(brand);
    handleClose();
  };

  return (
    <>
      <Button
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
        Brand
      </Button>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {MenuItems.map((menuItem, index) => (
          <MenuItem key={index} onClick={() => handleBrand(menuItem as Brand)}>
            {menuItem}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
