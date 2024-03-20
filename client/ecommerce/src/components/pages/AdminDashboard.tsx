import {
  Box,
  Card,
  CardContent,
  Container,
  Divider,
  Typography,
} from "@mui/material";
const color = "#30313D";
export const AdminDashboard = () => {
  return (
    <Box
      sx={{
        backgroundColor: "rgba(37,44,51,0.05)",
        display: "flex",
        padding: "0px 30px",
        height: "calc(100vh - 130px)",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Card
        sx={{
          width: "960px",
          display: "flex",
          height: "100%",
        }}
      >
        <CardContent sx={{width: '100%'}}>
          <Typography
            sx={{ color: color, fontSize: "28px", fontWeight: "600" }}
          >
            Notifications
          </Typography>
          <Divider></Divider>
        </CardContent>
      </Card>
      <Box sx={{ width: "300px" }}></Box>
    </Box>
  );
};
