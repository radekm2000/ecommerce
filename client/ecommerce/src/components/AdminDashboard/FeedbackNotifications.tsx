import { compareAsc, compareDesc, formatDistanceToNowStrict } from "date-fns";
import { useFetchFeedbacks } from "../../hooks/useFetchFeedbacks";
import { AdminDashboardSkeleton } from "./AdminDashboardSkeleton";
import { useEffect, useState } from "react";
import { Feedback } from "../../types/types";
import { DisplayFeedbackNotifications } from "./DisplayFeedbackNotifications";
import { featureType } from "../FeedbackDialog";
import { SortByFeatureButton } from "./FeedbackNotificationsComponents/SortByFeatureButton";
import {
  Box,
  Button,
  Divider,
  Skeleton,
  Typography,
  styled,
} from "@mui/material";
import { useLocation } from "wouter";

const FeedbackSkeleton = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <Skeleton
        variant="rectangular"
        sx={{ width: "15%", height: "40px", marginTop: "20px" }}
      ></Skeleton>
      <Divider />
      {Array(7)
        .fill(7)
        .map((v, index) => (
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Skeleton
              variant="text"
              sx={{ width: "70%", height: "40px" }}
            ></Skeleton>
            <Skeleton variant="text" sx={{ width: "10%" }}></Skeleton>
          </Box>
        ))}
    </Box>
  );
};

const FeatureButton = styled(Button)({
  cursor: "auto",
  padding: "8px 12px",
  backgroundColor: "#F2F2F2",
  fontSize: "14px",
  color: "#171717",
  borderRadius: "3996px",
  border: "1px solid #0000",
  textTransform: "none",
  "&:hover": {
    backgroundColor: "#F2F2F2",
  },
});

export const FeedbackNotifications = () => {
  const { data, isLoading } = useFetchFeedbacks();
  const [featureType, setFeatureType] = useState<featureType>();
  const [location, setLocation] = useLocation();
  useEffect(() => {
    const params = new URLSearchParams();
    if (featureType !== undefined) {
      params.set("featureType", featureType);
      setLocation(`/dashboard/feedbacks?${params.toString()}`);
    } else {
      setLocation(location);
    }
  }, [featureType]);

  if (isLoading) {
    return <FeedbackSkeleton />;
  }
  const sortFeedbacksByCreationTime = data?.sort((a, b) =>
    compareDesc(a.createdAt, b.createdAt)
  );

  const onFeatureSelected = (feature: featureType) => {
    setFeatureType(feature);
  };

  const clearFilters = () => {
    setFeatureType(undefined);
  };

  const timeFormattedFeedbacks = sortFeedbacksByCreationTime?.map((f) => {
    const formattedTime = formatDistanceToNowStrict(f.createdAt, {
      addSuffix: true,
    });

    return { ...f, createdAt: formattedTime };
  });

  const feedbacksSortByFeatureType = timeFormattedFeedbacks?.filter((f) => {
    if (featureType === undefined) {
      return f;
    } else {
      return f.featureType === featureType;
    }
  });

  return (
    <>
      <Box
        sx={{
          margin: "20px 0px",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <SortByFeatureButton onFeatureSelected={onFeatureSelected} />
        {featureType && <FeatureButton>{featureType}</FeatureButton>}
        {featureType ? (
          <Box sx={{ marginLeft: "auto" }}>
            <Button
              onClick={clearFilters}
              sx={{
                color: "#007782",
                textTransform: "none",
                alignItems: "flex-end",
                fontSize: "12px",
                border: "none",
                maxWidth: "83px",
                maxHeight: "21px",
                padding: "0px 5px",
              }}
            >
              Clear filters
            </Button>
          </Box>
        ) : null}
      </Box>
      <Divider></Divider>
      {feedbacksSortByFeatureType && (
        <DisplayFeedbackNotifications
          feedbackNotifications={feedbacksSortByFeatureType}
        />
      )}
    </>
  );
};
