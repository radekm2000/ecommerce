import { Box, Divider, Typography } from "@mui/material";
import { Feedback } from "../../types/types";
import { useState } from "react";
import { DisplayFeedbackDialog } from "./DisplayFeedbackDialog";
import { useMediaQuery } from "../../hooks/useMediaQuery";

export const DisplayFeedbackNotifications = ({
  feedbackNotifications,
}: {
  feedbackNotifications: Feedback[];
}) => {
  const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(
    null
  );
  const below700 = useMediaQuery(700);
  const handleCloseDialog = () => {
    setSelectedFeedback(null);
  };
  return (
    <Box sx={{ display: "flex", flexDirection: "column", marginTop: "10px" }}>
      {feedbackNotifications.map((notification, index) => (
        <>
          <Box
            key={index}
            sx={{
              display: "flex",
              padding: "8px",
              "&:hover": {
                backgroundColor: "#F0F4EF",
              },
            }}
          >
            <Typography sx={{ color: "#007782" }}>
              {notification.contactName}
            </Typography>
            {below700 ? null : (
              <Typography sx={{ ml: "10px" }}>
                added a feedback {notification.createdAt}
              </Typography>
            )}

            <DisplayFeedbackDialog
              key={index}
              contactName={notification.contactName}
              description={notification.description}
              email={notification.email}
              featureTypeValue={notification.featureType}
              handleClose={handleCloseDialog}
              open={selectedFeedback === notification}
            />
            <Typography
              onClick={() => {
                setSelectedFeedback(notification);
              }}
              sx={{ color: "#007782", cursor: "pointer", marginLeft: "auto" }}
            >
              view details
            </Typography>
          </Box>
          <Divider />
        </>
      ))}
    </Box>
  );
};
