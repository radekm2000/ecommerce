import { Box, Card, CardContent, Skeleton, styled } from "@mui/material";

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
export const AdminDashboardSkeleton = () => {
  return (
    <Container>
      <Card
        sx={{
          display: "flex",
          width: '100%',
          height: "90%",
          position: "relative",
          overflowY: "scroll",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        <CardContent sx={{ width: "100%", orientation: "vertical" }}>
          {Array(7)
            .fill(7)
            .map((_, index) => (
              <Box key={index}>
                <Skeleton variant="text" sx={{ height: "70px" }}></Skeleton>
              </Box>
            ))}
        </CardContent>
      </Card>
      <Sidebar></Sidebar>
    </Container>
  );
};
