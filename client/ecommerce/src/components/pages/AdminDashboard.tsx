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

enum TabValues {
  Notifications = "notifications",
  Feedbacks = "feedbacks",
}

export const AdminDashboard = () => {
  const { data: adminNotifications, isLoading } = useFetchAdminNotifications();
  const [tabValue, setTabValue] = useState<TabValues>(TabValues.Notifications);
  const [, setLocation] = useLocation();
  const [, params] = useRoute("/dashboard/:tab");

  useEffect(() => {
    if (params && params.tab) {
      setTabValue(params.tab as TabValues);
    } else {
      setLocation(`/dashboard/${TabValues.Notifications}`);
    }
  }, [params, setLocation]);

  const handleTabChange = (newValue: TabValues) => {
    setTabValue(newValue);
    setLocation(`/dashboard/${newValue}`);
  };

  const renderTabContent = () => {
    switch (tabValue) {
      case TabValues.Notifications:
        return adminNotifications && adminNotifications.length > 0 ? (
          <DisplayAdminNotifications adminNotifications={adminNotifications} />
        ) : (
          <Typography>No notifications</Typography>
        );
      case TabValues.Feedbacks:
        return <FeedbackNotifications />;
      default:
        return null;
    }
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
            "&::-webkit-scrollbar": { display: "none" },
          }}
        >
          <CardContent sx={{ width: "100%", orientation: "vertical" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={tabValue}
                onChange={(e, newValue) => handleTabChange(newValue)}
                aria-label="tabs"
                sx={{ "&& .Mui-selected": { color: "black" } }}
                TabIndicatorProps={{ style: { background: "#007782" } }}
              >
                <Tab
                  sx={{ textTransform: "none" }}
                  label="Notifications"
                  value={TabValues.Notifications}
                ></Tab>
                <Tab
                  sx={{ textTransform: "none" }}
                  label="Feedbacks"
                  value={TabValues.Feedbacks}
                ></Tab>
              </Tabs>
            </Box>
            {renderTabContent()}
          </CardContent>
        </Card>
        <Sidebar></Sidebar>
      </Container>
    </>
  );
};
