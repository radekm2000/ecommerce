import { Box, Container, Typography } from "@mui/material";
import { useMediaQuery } from "../../hooks/useMediaQuery";

export const Inbox = () => {
  const below1200 = useMediaQuery(1200);
  const below960 = useMediaQuery(960);
  const below1600 = useMediaQuery(1600);
  return (
    <Container
      maxWidth={false}
      sx={{ maxWidth: "1280px", margin: below1600 ? null : "0px 150px", display: 'flex', padding: '20px 20px' }}
    >
      <Box
        sx={{ width: below1200 ? "100%" : "75%", border: "1px solid black", padding: '0px 10px', display: 'flex' }}
      >
        {below960 ? null : (
          <Box sx={{ flex: "0 0 300px", border: "1px solid black" }}>
            <Typography>sidebar content</Typography>
          </Box>
        )}
        <Box sx={{ flex: "1 0 auto", border: "1px solid black" }}>
          <Typography>chat content</Typography>
        </Box>
      </Box>
      <Box
        sx={{ width: below1200 ? "none" : "25%", border: "1px solid black" }}
      >
      </Box>
    </Container>
  );
};
