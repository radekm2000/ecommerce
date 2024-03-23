import {
  Box,
  Card,
  CardContent,
  Rating,
  Skeleton,
  TextField,
} from "@mui/material";
import { useMediaQuery } from "../hooks/useMediaQuery";
const DisplayPaymentInfoSkeleton = () => {
  const below960 = useMediaQuery(960);
  return (
    <Card
      sx={{
        width: below960 ? "500px" : "300px",
        height: "300px",
        padding: "20px",
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "20px",
        }}
      >
        <Skeleton
          variant="circular"
          sx={{
            width: "16px",
            height: "16px",
            padding: "16px",
          }}
        ></Skeleton>
        <Skeleton variant="text" sx={{ width: "80%" }}></Skeleton>
        <Skeleton variant="text" sx={{ width: "80%" }}></Skeleton>
        <Skeleton variant="text" sx={{ width: "50%" }}></Skeleton>
        <Skeleton
          variant="rectangular"
          sx={{ marginTop: "20px", width: "40%", height: "30px" }}
        ></Skeleton>
      </CardContent>
    </Card>
  );
};

const ReviewSkeleton = () => {
  const below960 = useMediaQuery(960);

  return (
    <Card
      sx={{
        width: below960 ? "500px" : "300px",
        height: "300px",
        padding: "20px",
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "10px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Skeleton
              variant="circular"
              sx={{ width: "64px", height: "64px" }}
            ></Skeleton>
            <Skeleton
              variant="text"
              sx={{ width: "100px", marginLeft: "10px" }}
            ></Skeleton>
          </Box>
          <Box sx={{ marginTop: "10px" }}>
            <Skeleton>
              <Rating />
            </Skeleton>
          </Box>
          <Skeleton variant="rectangular">
            <TextField sx={{ width: "30%" }}></TextField>
          </Skeleton>
          <Skeleton
            variant="rectangular"
            sx={{ width: "100%", height: "30px", marginTop: "10px" }}
          ></Skeleton>
        </Box>
      </CardContent>
    </Card>
  );
};
export const PaymentSuccessSkeleton = () => {
  const below960 = useMediaQuery(960);

  return (
    <Box
      sx={{
        backgroundColor: "rgba(37,44,51,0.08)",
        display: "flex",
        flexDirection: below960 ? "column" : "row",
        height: "95vh",
        padding: "16px 30px",
        alignItems: "center",
        justifyContent: "center",
        gap: below960 ? "10px" : "200px",
      }}
    >
      <DisplayPaymentInfoSkeleton />
      <ReviewSkeleton />
    </Box>
  );
};
