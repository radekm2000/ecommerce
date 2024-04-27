import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Button,
  Card,
  CardMedia,
  Dialog,
  DialogContent,
  DialogTitle,
  Modal,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useState } from "react";

type ImagePreviewProps = {
  image: string
};

export const ImagePreview = ({ image }: ImagePreviewProps) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  if (!image) {
    return;
  }
  return (
    <>
      <Card sx={{ cursor: "pointer" }} onClick={handleClickOpen}>
        <CardMedia
          image={image}
          sx={{ width: "200px", height: "150px", objectFit: "contain" }}
        />
      </Card>
      <Dialog fullWidth maxWidth={"lg"} open={open} onClose={handleClose}>
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography sx={{ fontWeight: "800" }}>Image Preview</Typography>
          <Button sx={{ color: "grey" }} onClick={handleClose}>
            <CloseIcon sx={{ width: "30px", height: "30px" }} />
          </Button>
        </DialogTitle>
        <DialogContent sx={{ textAlign: "center" }}>
          <img
            src={image}
            alt="Preview"
            style={{
              objectFit: "contain",
              maxWidth: "100%",
              maxHeight: "77vh",
            }}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};
