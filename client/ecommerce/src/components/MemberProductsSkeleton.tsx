import { Box, Card, Divider, Grid, Skeleton } from "@mui/material";

const MemberProductsSkeleton = () => {
  return (
    <Box
      sx={{
        maxWidth: "1260px",
        width: "100%",
        display: "column",
        padding: "20x",
      }}
    >
      <Divider></Divider>
      <Skeleton
        variant="text"
        sx={{ height: "10px", width: "15%", marginTop: "15px" }}
      ></Skeleton>
      <Box sx={{ display: "flex", gap: "10px" }}>
        {Array(5)
          .fill(5)
          .map((card, index) => (
            <Skeleton sx={{ width: "220px", height: "500px" }}></Skeleton>
          ))}
      </Box>
    </Box>
  );
};

export default MemberProductsSkeleton;
