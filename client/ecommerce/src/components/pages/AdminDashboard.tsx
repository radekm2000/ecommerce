import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Typography,
  styled,
} from "@mui/material";
import { useFetchAdminNotifications } from "../../hooks/useFetchAdminNotifications";
import DisplayAdminNotifications from "../DisplayAdminNotifications";
const color = "#30313D";
const Container = styled(Box)({
  backgroundColor: "rgba(37,44,51,0.05)",
  display: "flex",
  padding: "0px 30px",
  height: "calc(100vh - 81px)",
  alignItems: "center",
  justifyContent: "center",
});

const Sidebar = styled(Box)({
  width: "300px",
  display: "flex",
});

export const AdminDashboard = () => {
  const { data: adminNotifications, isLoading } = useFetchAdminNotifications();

  if (isLoading) {
    return "isLoading...";
  }

  return (
    <>
      <Container>
        <Card
          sx={{
            width: "960px",
            display: "flex",
            height: "90%",
            position: "relative",
          }}
        >
          <CardContent sx={{ width: "100%" }}>
            <Typography
              sx={{ color: color, fontSize: "28px", fontWeight: "600" }}
            >
              Notifications
            </Typography>
            <Divider />

            {adminNotifications && adminNotifications.length > 0 ? (
              <DisplayAdminNotifications
                adminNotifications={adminNotifications}
              />
            ) : (
              <Typography>No notifications</Typography>
            )}
          </CardContent>
        </Card>
        <Sidebar></Sidebar>
      </Container>
    </>
  );
};
