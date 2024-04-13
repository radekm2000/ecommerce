import { Box, Container, Divider, Skeleton } from "@mui/material";

export const CatalogSkeleton = () => {
  return (
    <Container>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <Skeleton
          variant="text"
          sx={{ width: "10%", height: "20px" }}
        ></Skeleton>
        <Skeleton
          variant="text"
          sx={{ width: "15%", height: "20px" }}
        ></Skeleton>
        <Divider />
        <Box sx={{ display: "flex", gap: "20px" }}>
          <Skeleton
            variant="rectangular"
            sx={{ width: "70px", height: "20px" }}
          ></Skeleton>
          <Skeleton
            variant="rectangular"
            sx={{ width: "70px", height: "20px" }}
          ></Skeleton>
        </Box>
        <Divider />
      </Box>
    </Container>
  );
};
