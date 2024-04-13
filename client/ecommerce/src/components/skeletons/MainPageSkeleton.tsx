import { Box, Card, CardContent, CardHeader, Skeleton } from "@mui/material";

export const MainPageSkeleton = () => {
  return (
    <Box
      sx={{
        height: "100%",
        minHeight: "calc(100vh - 81px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        maxWidth: "100%",
        marginTop: "200px",
        padding: "15px",
      }}
    >
      <Box sx={{ maxWidth: "1260px", width: "100%", display: "flex", gap: '20px' }}>
        {Array(4)
          .fill(4)
          .map((v, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "20%",
                gap: "10px",
              }}
            >
              <Box sx={{ display: "flex", width: "100%", gap: "10px" }}>
                <Skeleton
                  variant="circular"
                  sx={{ height: "32px", width: "32px" }}
                ></Skeleton>
                <Skeleton variant="text" sx={{ width: "70%" }}></Skeleton>
              </Box>
              <Skeleton variant="rounded" sx={{ height: "300px" }}></Skeleton>
            </Box>
          ))}
      </Box>
    </Box>
  );
};
