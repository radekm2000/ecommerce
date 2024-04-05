import { compareAsc, compareDesc, formatDistanceToNowStrict } from "date-fns";
import { useFetchFeedbacks } from "../../hooks/useFetchFeedbacks";
import { AdminDashboardSkeleton } from "./AdminDashboardSkeleton";
import { useState } from "react";
import { Feedback } from "../../types/types";
import { DisplayFeedbackNotifications } from "./DisplayFeedbackNotifications";

export const FeedbackNotifications = () => {
  const { data, isLoading } = useFetchFeedbacks();

  if (isLoading) {
    return <AdminDashboardSkeleton />;
  }
  const sortFeedbacksByCreationTime = data?.sort((a, b) =>
    compareDesc(a.createdAt, b.createdAt)
  );

  const timeFormattedFeedbacks = sortFeedbacksByCreationTime?.map((f) => {
    const formattedTime = formatDistanceToNowStrict(f.createdAt, {
      addSuffix: true,
    });

    return { ...f, createdAt: formattedTime };
  });

  return (
    <>
      {timeFormattedFeedbacks && (
        <DisplayFeedbackNotifications
          feedbackNotifications={timeFormattedFeedbacks}
        />
      )}
    </>
  );
};
