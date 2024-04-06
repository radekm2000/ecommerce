import {
  Box,
  Card,
  CardContent,
  Tab,
  Tabs,
  Typography,
  styled,
} from "@mui/material";
import { useFetchAdminNotifications } from "../../hooks/useFetchAdminNotifications";
import DisplayAdminNotifications from "../DisplayAdminNotifications";
import { SyntheticEvent, useEffect, useState } from "react";
import { FeedbackNotifications } from "../AdminDashboard/FeedbackNotifications";
import { AdminDashboardSkeleton } from "../AdminDashboard/AdminDashboardSkeleton";
import { useLocation, useRoute } from "wouter";
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
  const [tabValue, setTabValue] = useState("notifications");
  const [, setLocation] = useLocation();
  const [, params] = useRoute("/dashboard/:tab");

  useEffect(() => {
    if (!params || !params.tab) {
      setLocation(`/dashboard/${tabValue}`);
    } else {
      setTabValue(params.tab);
    }
  }, [params, setLocation, tabValue]);

  const handleTabChange = (e: SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
    setLocation(`/dashboard/${newValue}`);
  };

  if (isLoading) {
    return <AdminDashboardSkeleton />;
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
            overflowY: "scroll",
            "&::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          <CardContent sx={{ width: "100%", orientation: "vertical" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={tabValue}
                onChange={handleTabChange}
                aria-label="tabs"
                sx={{
                  "&& .Mui-selected": {
                    color: "black",
                  },
                }}
                TabIndicatorProps={{ style: { background: "#007782" } }}
              >
                <Tab
                  sx={{ textTransform: "none" }}
                  label="Notifications"
                  value="notifications"
                ></Tab>
                <Tab
                  sx={{ textTransform: "none" }}
                  label="Feedbacks"
                  value="feedbacks"
                ></Tab>
              </Tabs>
            </Box>
            {tabValue === "notifications" ? (
              adminNotifications && adminNotifications.length > 0 ? (
                <DisplayAdminNotifications
                  adminNotifications={adminNotifications}
                />
              ) : (
                <Typography>No notifications</Typography>
              )
            ) : (
              <FeedbackNotifications />
            )}
          </CardContent>
        </Card>
        <Sidebar></Sidebar>
      </Container>
    </>
  );
};
