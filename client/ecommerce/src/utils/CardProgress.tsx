import { Box, BoxProps, CircularProgress, styled } from "@mui/material";

const Container = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export const CardProgress = (props: BoxProps) => (
  <Container {...props}>
    <CircularProgress sx={{ color: "#d5d5d5" }} />
  </Container>
);
