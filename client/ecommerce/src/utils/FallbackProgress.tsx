import { Box, Grid } from "@mui/material";
import { useEffect, useState } from "react";

import { CardProgress } from "./CardProgress";

export const FallbackProgress = () => {
  const [display, setDisplay] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDisplay(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (!display) {
    return null;
  }

  return (
    <Grid item xs={12} md={12} lg={12} xl={12}>
      <Box sx={{ height: "50vh", display: "flex", justifyContent: "center" }}>
        <CardProgress />
      </Box>
    </Grid>
  );
};
