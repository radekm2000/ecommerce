import { Button, Menu, MenuItem } from "@mui/material";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";
export const SortByPriceButton = ({
  onPriceSelected,
}: {
  onPriceSelected: (order: string) => void;
}) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setIsActive(true);
    setAnchorEl(event.currentTarget);
    console.log(event.currentTarget);
    setIsMenuOpen(true);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setIsMenuOpen(false);
    setIsActive(!isActive);
  };

  const handleOrder = (order: string) => {
    onPriceSelected(order);
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
        Sort by
      </Button>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={() => handleOrder("price_high_to_low")}>
          Price: High to Low
        </MenuItem>
        <MenuItem onClick={() => handleOrder("price_low_to_high")}>
          Price: Low to High
        </MenuItem>
      </Menu>
    </>
  );
};
