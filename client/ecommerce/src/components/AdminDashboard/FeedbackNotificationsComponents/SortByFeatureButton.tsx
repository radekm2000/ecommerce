import { Button, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { featureType } from "../../FeedbackDialog";
export const SortByFeatureButton = ({
  onFeatureSelected,
}: {
  onFeatureSelected: (feature: featureType) => void;
}) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleClose = () => {
    setAnchorEl(null);
    setIsMenuOpen(false);
    setIsActive(!isActive);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setIsActive(true);
    setAnchorEl(event.currentTarget);
    setIsMenuOpen(true);
  };

  const handleFeatureType = (feature: featureType) => {
    onFeatureSelected(feature);
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
        Feature type
      </Button>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {["other", "enhancement", "bug", "new feature"].map((type) => (
          <MenuItem
            key={type}
            onClick={() => handleFeatureType(type as featureType)}
          >
            {type}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
