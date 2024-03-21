import { AdminNotification } from "../types/types";
import { Box, Divider, Typography } from "@mui/material";
import { formatDistanceToNowStrict } from "date-fns";

const DisplayAdminNotifications = ({
  adminNotifications,
}: {
  adminNotifications: AdminNotification[];
}) => {
  const timeFormattedAdminNotifications = adminNotifications.map(
    (notification) => {
      const formattedTime = formatDistanceToNowStrict(notification.createdAt, {
        addSuffix: true,
      });

      return {
        ...notification,
        createdAt: formattedTime,
      };
    }
  );
  return (
    <Box sx={{ display: "flex", flexDirection: "column", marginTop: "10px" }}>
      {timeFormattedAdminNotifications.map((notification, index) => (
        <>
          <Box
            key={index}
            sx={{
              display: "flex",
              padding: "8px",
              "&:hover": {
                backgroundColor: "#F0F4EF",
              },
            }}
          >
            <Typography>
              {notification.username} {notification.action}
            </Typography>
            <Typography
              sx={{
                color: "#1212125A",
                fontSize: "14px",
                display: "flex",
                marginLeft: "auto",
              }}
            >
              {notification.createdAt}
            </Typography>
          </Box>
          <Divider />
        </>
      ))}
    </Box>
  );
};

export default DisplayAdminNotifications;
