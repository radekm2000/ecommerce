import PopupState, { bindPopover, bindTrigger } from "material-ui-popup-state";
import { ProductNotification } from "../types/types";
import {
  Badge,
  Box,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Popover,
  Typography,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Link } from "wouter";

export default function PopoverPopupState({
  productNotifications,
}: {
  productNotifications: ProductNotification[];
}) {
  const notReadProductNotifications = productNotifications.filter(
    (n) => !n.isRead
  );
  return (
    <PopupState variant="popover" popupId="demo-popup-popover">
      {(popupState) => (
        <>
          <IconButton
            {...bindTrigger(popupState)}
            size="large"
            aria-label="show new notifications"
            color="primary"
          >
            <Badge
              color="error"
              badgeContent={
                notReadProductNotifications.length >= 1
                  ? notReadProductNotifications.length
                  : null
              }
            >
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <Popover
            {...bindPopover(popupState)}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
          >
            <Card
              sx={{ display: "flex", flexDirection: "column", width: "300px" }}
            >
              {productNotifications?.map((notification, index) => (
                <Box
                  key={index}
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
              ))}
            </Card>
          </Popover>
        </>
      )}
    </PopupState>
  );
}
