import { Box, Button, Typography } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { UserWithFollows } from "../types/types";

export const InboxChatNavbar = () => {
  return (
    <Box
      sx={{
        height: "52px",
        display: "flex",
        justifyContent: "center",
        textAlign: "left",
        alignItems: "center",
        borderBottom: "1px solid rgba(23, 23, 23, 0.08)",
        padding: "4px",
      }}
    >
      <Typography sx={{ color: "#007782", margin: "0 auto" }}>new</Typography>
      <Button sx={{ maxWidth: "30px", maxHeight: "50px" }}>
        <InfoOutlinedIcon
          sx={{
            width: "24px",
            height: "24px",
            color: "black",
          }}
        />
      </Button>
    </Box>
  );
};
