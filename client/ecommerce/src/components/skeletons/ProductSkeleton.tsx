import { Box, Skeleton } from "@mui/material";
import { useMediaQuery } from "../../hooks/useMediaQuery";

export const ProductSkeleton = () => {
  const below960 = useMediaQuery(960);
  return (
    <Box
      sx={{
        backgroundColor: "rgba(37,44,51,0.03)",
        display: "flex",
        flexDirection: "column",
        height: "calc(78vh)",
        padding: "16px 30px",
        alignItems: "flex-start",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: "1260px",
          display: "flex",
          flexDirection: below960 ? "column" : "row",
        }}
      >
        <Box sx={{ width: below960 ? "100%" : "77%", height: "auto" }}>
          <Skeleton
            variant="rectangular"
            sx={{
              alignSelf: "center",
              height: "100%",
              width: "auto",
              margin: "0px 200px",
            }}
          ></Skeleton>
        </Box>
        <Box sx={{ width: below960 ? "100%" : "23%", padding: "0px 10px" }}>
          <Skeleton variant="rectangular" sx={{ height: "500px" }}></Skeleton>
        </Box>
      </Box>
      <Skeleton
        variant="rectangular"
        sx={{ width: "82%", height: "30px", marginTop: "50px" }}
      ></Skeleton>
    </Box>
  );
};
