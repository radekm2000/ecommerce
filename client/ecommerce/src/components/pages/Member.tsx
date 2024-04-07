import { Box } from "@mui/material";
import { useLocation, useParams } from "wouter";
import { ProfileInfo } from "../ProfileInfo";
import { useAllProducts } from "../../hooks/useAllProducts";
import { useUserInfo } from "../../hooks/useUserInfo";
import BasicTabs from "../TabPanel";
import { useEffect, useState } from "react";
import { compareDesc, formatDistanceToNowStrict } from "date-fns";
import { UserProfileSkeleton } from "../UserProfileSkeleton";
import MemberProductsSkeleton from "../MemberProductsSkeleton";

export const Member = () => {
  const [tab, setTab] = useState("");
  const params = useParams();
  const [location, setLocation] = useLocation();
  const userId = params?.userId;
  const { data: user, isLoading: isUserInfoLoading } = useUserInfo(
    parseInt(userId!)
  );
  const { data: products, isLoading: isUserProductsLoading } = useAllProducts();

  useEffect(() => {
    const params = new URLSearchParams();
    if (tab) {
      params.set("tab", tab);
      setLocation(`${location}?tab=${tab}`);
    }
  });

  if (isUserInfoLoading || isUserProductsLoading || !user || !userId) {
    return (
      <Box
        sx={{
          height: "100%",
          minHeight: "calc(100vh - 81px)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "20px",
          maxWidth: "100%",
        }}
      >
        <UserProfileSkeleton />
        <Box
          sx={{
            maxWidth: "1260px",
            width: "100%",
            display: "column",
            padding: "20x",
          }}
        >
          <MemberProductsSkeleton />
        </Box>
      </Box>
    );
  }

  const memberProducts = products?.filter(
    (product) => product.user.id === parseInt(userId)
  );
  if (!memberProducts) {
    return "No products yet";
  }

  const reviews = user.reviews;

  const sortedReviewsByCreateTime = reviews.sort((a, b) =>
    compareDesc(a.createdAt, b.createdAt)
  );

  const timeFormattedReviews = sortedReviewsByCreateTime.map((review) => {
    const formattedDistance = formatDistanceToNowStrict(review.createdAt, {
      addSuffix: true,
    });
    return {
      ...review,
      createdAt: formattedDistance,
    };
  });
  return (
    <Box
      sx={{
        height: "100%",
        minHeight: "calc(100vh - 81px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
        maxWidth: "100%",
      }}
    >
      <ProfileInfo user={user} />
      <Box
        sx={{
          maxWidth: "1260px",
          width: "100%",
          display: "column",
          padding: "20x",
        }}
      >
        <BasicTabs
          reviews={timeFormattedReviews}
          setTab={setTab}
          memberproducts={memberProducts}
        />
      </Box>
    </Box>
  );
};
