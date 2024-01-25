import { Box, Typography } from "@mui/material";

export const ProtectedRoute = () => {
  return (
    <Box
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Typography sx={{ fontSize: "40px" }}>
        You have to log in to access this content
      </Typography>
    </Box>
  );
};
