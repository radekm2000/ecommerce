import { Box, Button, Typography } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { Conversation } from "../../types/types";
import { getRecipientFromConversation } from "../../utils/getRecipientFromConversation";
import { useUserContext } from "../../contexts/UserContext";

export const InboxChatNavbar = ({
  selectedUserConversation,
  setIsConversationDetailsOpen,
  isConversationDetailsOpen,
}: {
  selectedUserConversation: Conversation | undefined;
  setIsConversationDetailsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isConversationDetailsOpen: boolean;
}) => {
  const { user } = useUserContext();
  const recipientOfConversation = getRecipientFromConversation(
    selectedUserConversation!,
    user.username
  );

  const handleInfoChatClick = () => {
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
        borderBottom: "1px solid rgba(23, 23, 23, 0.08)",
        padding: "4px",
      }}
    >
      <Typography sx={{ color: "black", margin: "0 auto" }}>
        {recipientOfConversation
          ? recipientOfConversation.username
          : "New Message"}
      </Typography>
      <Button
        onClick={handleInfoChatClick}
        sx={{ maxWidth: "30px", maxHeight: "50px" }}
      >
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
