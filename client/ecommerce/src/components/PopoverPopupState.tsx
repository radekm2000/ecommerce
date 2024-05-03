import PopupState, { bindPopover, bindTrigger } from "material-ui-popup-state";
import { ProductNotification } from "../types/types";
import {
  Badge,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Popover,
  Typography,
} from "@mui/material";
import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Link } from "wouter";
import { useDeleteProductNotificationsMutation } from "../hooks/useDeleteProductNotificationsMutation";

export default function PopoverPopupState({
  productNotifications,
}: {
  productNotifications: ProductNotification[];
}) {
  const mutation = useDeleteProductNotificationsMutation();
  const { mutate: deleteProductNotifications } = mutation;
  const handleClearNotificationsClick = () => {
    deleteProductNotifications();
  };
  const notReadProductNotifications = productNotifications.filter(
    (n) => !n.isRead
  );
  return (
    <PopupState variant="popover" popupId="demo-popup-popover">
      {(popupState) => (
        <>
          <IconButton
            component="span"
            {...bindTrigger(popupState)}
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
              {productNotifications.length >= 1 ? (
                productNotifications?.map((notification, index) => (
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
                ))
              ) : (
                <Box>
                  <CardContent
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <NotificationsActiveOutlinedIcon sx={{width: '48px', height: '48px', mb: '10px'}} />
                    <Typography>No notifications yet</Typography>
                    <Typography sx={{ fontSize: "13px", color: "#4D4D4D" }}>
                      This is where you'll find your notifications
                    </Typography>
                  </CardContent>
                </Box>
              )}
              {productNotifications.length >= 1 && (
                <Button
                  component="span"
                  onClick={() => {
                    handleClearNotificationsClick();
                    popupState.close();
                  }}
                  variant="outlined"
                  sx={{
                    textTransform: "none",
                    color: "#007782",
                    width: "100%",
                    padding: "16px",
                    border: "none",
                    "&: hover": {
                      backgroundColor: "rgba(23, 23, 23, 0.05)",
                      border: "none",
                    },
                  }}
                >
                  Clear notifications
                </Button>
              )}
            </Card>
          </Popover>
        </>
      )}
    </PopupState>
  );
}
