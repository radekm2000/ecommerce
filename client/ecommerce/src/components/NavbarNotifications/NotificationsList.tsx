import { Box, CardContent, Typography } from "@mui/material";
import { ProductNotification } from "../../types/types";
import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";
import { NotificationCard } from "./NotificationCard";

type Props = {
  productNotifications: ProductNotification[];
};

export const NotificationsList = ({ productNotifications }: Props) => {
  if (productNotifications.length === 0) {
    return (
      <Box>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <NotificationsActiveOutlinedIcon
            sx={{ width: "48px", height: "48px", mb: "10px" }}
          />
          <Typography>No notifications yet</Typography>
          <Typography sx={{ fontSize: "13px", color: "#4D4D4D" }}>
            This is where you'll find your notifications
          </Typography>
        </CardContent>
      </Box>
    );
  }

  return (
    <>
      {productNotifications.map((notification, index) => (
        <NotificationCard key={index} notification={notification} />
      ))}
    </>
  );
};
