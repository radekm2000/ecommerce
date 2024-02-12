import { Box, Button, Container } from "@mui/material";
import { Link } from "wouter";

export const NotAuthed = () => {
  return (
    <Container
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Link to="/login">
          <Button sx={{ textTransform: "none" }}>
            Sign in or log in to access the content
          </Button>
        </Link>
      </Box>
    </Container>
  );
};
