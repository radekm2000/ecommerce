import { Box, Button, Typography } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
export const ConversationDetailsNavbar = ({
  setIsConversationDetailsOpen,
  isConversationDetailsOpen,
}: {
  setIsConversationDetailsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isConversationDetailsOpen: boolean;
}) => {
  const handleConversationDetailsOnClose = () => {
    setIsConversationDetailsOpen(!isConversationDetailsOpen);
  };
  return (
    <Box
      sx={{
        height: "52px",
        display: "flex",
        justifyContent: "center",
        textAlign: "left",
        alignItems: "center",
        padding: "4px",
      }}
    >
      <Typography sx={{ color: "#171717", margin: "0 auto" }}>
        Conversation details
      </Typography>
      <Button
        onClick={handleConversationDetailsOnClose}
        sx={{ maxWidth: "30px", maxHeight: "50px" }}
      >
        <ClearIcon
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
