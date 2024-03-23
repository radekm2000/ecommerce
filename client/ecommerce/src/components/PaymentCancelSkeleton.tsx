import { Box, Card, CardContent, Skeleton } from "@mui/material";

export const PaymentCancelSkeleton = () => {
  return (
    <Box
      sx={{
        backgroundColor: "rgba(37,44,51,0.08)",
        display: "flex",
        height: "95vh",
        padding: "16px 30px",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Card
        sx={{
          width: "300px",
          height: "300px",
          padding: "20px",
        }}
      >
        <CardContent
          sx={{
            gap: "20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Skeleton
            variant="circular"
            sx={{ height: "24px", width: "24px", padding: "16px" }}
          ></Skeleton>
          <Skeleton variant="text" sx={{ width: "60%" }}></Skeleton>

          <Skeleton
            variant="rectangular"
            sx={{ width: "100px", height: "30px" }}
          ></Skeleton>
        </CardContent>
      </Card>
    </Box>
  );
};
