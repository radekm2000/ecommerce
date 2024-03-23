import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import { useLocation } from "wouter";
import PaidRoundedIcon from "@mui/icons-material/PaidRounded";
import { useEffect, useState } from "react";
import { useUserContext } from "../../contexts/UserContext";
import { useQuery } from "@tanstack/react-query";
import { axiosApi } from "../../api/axios";
import { useUserFromAccessToken } from "../../hooks/useUserFromAccessToken";
import { PaymentCancelSkeleton } from "../PaymentCancelSkeleton";
export const PaymentCancel = () => {
  const [, setLocation] = useLocation();
  const { user, setUser } = useUserContext();
  const [aT, setAt] = useState("");

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      setAt(accessToken);
    }
  }, []);
  const { data: userData, isLoading, isSuccess } = useUserFromAccessToken(aT);

  useEffect(() => {
    if (isSuccess) {
      setUser(userData);
    }
  }, [user, isSuccess]);
  if (isLoading) {
    return <PaymentCancelSkeleton />;
  }
  const handleButtonClick = () => {
    if (user) {
      setLocation("/");
    }
  };

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
          <PaidRoundedIcon
            sx={{
              color: "rgba(214, 40, 40, 1)",
              height: "24px",
              width: "24px",
              fontSize: "large",
              padding: "16px",
            }}
          />
          <Typography sx={{ fontSize: "24px" }}>Payment Canceled</Typography>
          <Button
            onClick={handleButtonClick}
            sx={{
              textTransform: "none",
              marginTop: "20px",
              backgroundColor: "rgba(214, 40, 40, 1)",
              color: "white",
              "&:hover": {
                backgroundColor: "rgba(214, 40, 40, 1)",
              },
            }}
          >
            Go back to main page
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};
