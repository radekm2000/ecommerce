import { Box, Container, Skeleton } from "@mui/material";
import React from "react";
const Sidebar = () => {
  return (
    <Box
      sx={{
        width: "30%",
        borderRight: "1px solid rgba(23, 23, 23, 0.08)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          borderBottom: "1px solid rgba(23, 23, 23, 0.08)",
          marginTop: "50px",
        }}
      ></Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          padding: "8px",
        }}
      >
        {Array(7)
          .fill(7)
          .map((_, index) => (
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <Skeleton
                variant="circular"
                sx={{ height: "48px", width: "48px" }}
              ></Skeleton>
              <Skeleton
                variant="text"
                sx={{ width: "30%", height: "20px" }}
              ></Skeleton>
            </Box>
          ))}
      </Box>
    </Box>
  );
};

const InboxContainer = () => {
  return (
    <Container
      maxWidth={false}
      sx={{
        maxWidth: "1280px",
        margin: "0px 150px",
        display: "flex",
        padding: "20px 20px",
        minHeight: "500px",
      }}
    >
      <Box
        sx={{
          width: "75%",
          border: "1px solid rgba(23, 23, 23, 0.08)",
          display: "flex",
        }}
      >
        <Sidebar />
        <Box sx={{ width: "70%" }}></Box>
      </Box>
    </Container>
  );
};
export const InboxSkeleton = () => {
  return <InboxContainer></InboxContainer>;
};
