import { Box, CardContent, CardMedia, Typography } from "@mui/material";
import { ProductNotification } from "../../types/types";
import { Link } from "wouter";

type Props = {
  notification: ProductNotification;
};

export const NotificationCard = ({ notification }: Props) => {
  return (
    <Box
      sx={{
        display: "flex",
        "&:hover": {
          backgroundColor: "rgba(23, 23, 23, 0.10)",
        },
        borderBottom: "1px solid rgba(23, 23, 23, 0.10)",
      }}
    >
      <Link
        to={`/products/${notification.product.id}-${notification.product.title}`}
      >
        <CardMedia
          sx={{
            width: "auto",
            height: "64px",
            padding: "20px",
            cursor: "pointer",
          }}
          component="img"
          image={notification.product.images[0].imageUrl}
        ></CardMedia>
      </Link>
      <CardContent sx={{ wordBreak: "break-word" }}>
        <Typography>{notification.message}</Typography>
      </CardContent>
    </Box>
  );
};
