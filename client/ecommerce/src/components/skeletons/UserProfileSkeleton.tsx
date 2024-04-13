import { Box, Rating, Skeleton } from "@mui/material";

export const UserProfileSkeleton = () => {
  return (
    <Box
      sx={{
        maxWidth: "1260px",
        width: "100%",
        display: "flex",
        padding: "20px",
      }}
    >
      <Skeleton
        variant="circular"
        sx={{
          width: "192px",
          height: "150px",
          marginRight: "20px",
          padding: "20px",
        }}
      ></Skeleton>
      <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            padding: "16px 0px",
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column", gap: '10px' }}>
            <Skeleton variant="text" sx={{ width: "80px" }}></Skeleton>
            <Box sx={{ display: "flex", gap: "20px", alignItems: "center" }}>
              <Skeleton variant="text" sx={{ width: "100px" }}></Skeleton>
              <Skeleton variant="text" sx={{ width: "50px" }}></Skeleton>
            </Box>
            <Skeleton variant="text" sx={{ width: "150px", marginTop: '20px' }}></Skeleton>
          </Box>
        </Box>
      </Box>
      <Skeleton
        variant="rounded"
        sx={{ height: "50px", width: "150px" }}
      ></Skeleton>
    </Box>
  );
};
