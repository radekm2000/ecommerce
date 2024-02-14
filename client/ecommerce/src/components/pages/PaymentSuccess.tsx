import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import PaidRoundedIcon from "@mui/icons-material/PaidRounded";
import { useLocation, useParams, useRoute } from "wouter";
import { useEffect, useState } from "react";
import { useUserContext } from "../../contexts/UserContext";
import { useUserFromAccessToken } from "../../hooks/useUserFromAccessToken";
import { useQuery } from "@tanstack/react-query";
import { axiosApi } from "../../api/axios";
import { SessionObjLoadingLayout } from "../stripe-payment/sessionObjLoadingLayout";

export const PaymentSuccess = () => {
  const [location, setLocation] = useLocation();
  const { user, setUser } = useUserContext();
  const [aT, setAt] = useState("");
  const [stripeSessionId, setStripeSessionId] = useState("");
  console.log(stripeSessionId);
  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const sessionId = urlSearchParams.get("session_id");
    if (sessionId) {
      setStripeSessionId(sessionId);
    }
  }, []);
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      setAt(accessToken);
    }
  }, []);
  const { data: userData, isLoading, isSuccess } = useUserFromAccessToken(aT);
  const { data: sessionObj, isLoading: isSessionObjLoading } = useQuery({
    queryKey: [`stripe`, `session`],
    queryFn: async () => {
      const response = await axiosApi.get(
        `products/checkout/sessions/${stripeSessionId}`
      );
      return response.data;
    },
    enabled: !!stripeSessionId,
  });

  useEffect(() => {
    if (isSuccess) {
      setUser(userData);
    }
  }, [user, isSuccess]);
  if (isLoading) {
    return "user info is loading...";
  }
  if (isSessionObjLoading) {
    return <SessionObjLoadingLayout />;
  }
  const handleButtonClick = () => {
    if (user) {
      setLocation("/");
    }
  };
  const customerInfo = {
    name: sessionObj?.customer_details?.name,
    email: sessionObj?.customer_details?.email,
  };

  return (
    <>
      {customerInfo && (
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
                  color: "rgba(37, 211, 102, 1)",
                  height: "24px",
                  width: "24px",
                  fontSize: "large",
                  padding: "16px",
                }}
              />
              <Typography
                sx={{
                  fontSize: "18px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                Thanks for your payment {customerInfo.name}
              </Typography>
              <Typography sx={{ fontSize: "16px" }}>
                Payment details will be sent on email
              </Typography>
              <Typography fontWeight={700}>{customerInfo.email}</Typography>
              <Button
                onClick={handleButtonClick}
                sx={{
                  textTransform: "none",
                  marginTop: "20px",
                  backgroundColor: "rgba(37, 211, 102, 1)",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "rgba(37, 211, 102, 1)",
                  },
                }}
              >
                Continue shopping
              </Button>
            </CardContent>
          </Card>
        </Box>
      )}
    </>
  );
};
