import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import PaidRoundedIcon from "@mui/icons-material/PaidRounded";
import { useLocation } from "wouter";
import { useEffect, useState } from "react";
import { useUserContext } from "../../contexts/UserContext";
import { useUserFromAccessToken } from "../../hooks/useUserFromAccessToken";
import { useQuery } from "@tanstack/react-query";
import { axiosApi } from "../../api/axios";
import { useGetBasicUserInfo } from "../../hooks/useGetBasicUserInfo";
import { ReviewForm } from "../ratingSystem/ReviewForm";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { PaymentSuccessSkeleton } from "../PaymentSuccessSkeleton";
import { useAddAdminNotification } from "../../hooks/useAddAdminNotification";

export const PaymentSuccess = () => {
  const below960 = useMediaQuery(960);

  const [location, setLocation] = useLocation();
  const { user, setUser } = useUserContext();
  const [aT, setAt] = useState("");
  const [stripeSessionId, setStripeSessionId] = useState("");
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
  const itemOwnerId = sessionObj?.itemOwnerId as number;
  const itemDescription = sessionObj?.itemDescription as string[];
  const itemPrice = sessionObj?.itemPrice as { unit: string; amount: number }[];
  const adminNotificationMutation = useAddAdminNotification();
  const { mutate: mutateAdminNotification } = adminNotificationMutation;
  const { data: ownerData, isLoading: isOwnerDataLoading } =
    useGetBasicUserInfo(itemOwnerId);

  useEffect(() => {
    if (isSuccess) {
      setUser(userData);
    }
  }, [user, isSuccess]);
  useEffect(() => {
    if (ownerData && user && itemDescription && itemPrice.length > 0) {
      mutateAdminNotification({
        username: user.username,
        userId: user.id,
        createdAt: "",
        action: `purchased a product ${itemDescription[0]} for ${
          itemPrice[0].amount / 100
        } ${itemPrice[0].unit}`,
      });
    }
  }, [ownerData, user, itemPrice, mutateAdminNotification]);
  if (isLoading) {
    return "user info is loading...";
  }

  if (isSessionObjLoading && !ownerData) {
    return <PaymentSuccessSkeleton />;
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
      {customerInfo && ownerData && (
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
          <Card
            sx={{
              width: below960 ? "500px" : "300px",
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
          <ReviewForm user={ownerData} />
        </Box>
      )}
    </>
  );
};
