import { Box, Divider, Skeleton } from "@mui/material";

export const NavbarSkeleton = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Box sx={{ height: "15vh", display: "flex", gap: "10px" }}>
        <Skeleton
          sx={{ height: "50px", width: "20%", marginLeft: "150px" }}
        ></Skeleton>
        <Skeleton sx={{ height: "50px", width: "30%" }}></Skeleton>
        <Skeleton
          sx={{ height: "50px", width: "10%", marginLeft: "100px" }}
        ></Skeleton>
        <Box
          sx={{
            display: "flex",
            gap: "20px",
            marginTop: "10px",
            marginLeft: "50px",
            width: "50%",
            alignItems: "flex-start",
          }}
        >
          <Skeleton
            variant="circular"
            sx={{ width: "32px", height: "32px" }}
          ></Skeleton>
          <Skeleton
            variant="circular"
            sx={{ width: "32px", height: "32px" }}
          ></Skeleton>
          <Skeleton
            variant="circular"
            sx={{ width: "32px", height: "32px" }}
          ></Skeleton>
        </Box>
      </Box>
      <Divider />
      <Box sx={{ display: "flex", marginLeft: "150px", gap: "10px" }}>
        <Skeleton
          variant="text"
          sx={{ width: "50px", height: "50px" }}
        ></Skeleton>
        <Skeleton
          variant="text"
          sx={{ width: "50px", height: "50px" }}
        ></Skeleton>
      </Box>
      <Divider />
    </Box>
  );
};
