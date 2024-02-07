import { Avatar, Box, Typography } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useLocation, useParams } from "wouter";
import { RecipientOfSidebarConversation } from "../types/types";
const displayLastMessage = (message: string) => {
  if (message.length > 20) {
    return message.slice(0, 20).concat("...");
  }
  return message;
};

export const InboxSidebar = ({
  recipientsOfSidebarConversations,
  setSelectedUserId,
}: {
  setSelectedUserId: React.Dispatch<React.SetStateAction<number>>;
  recipientsOfSidebarConversations:
    | RecipientOfSidebarConversation[]
    | undefined;
}) => {
  const [, setLocation] = useLocation();
  const params = useParams();
  const userId = params?.userId;
  const sortedRecipients = [...recipientsOfSidebarConversations!].sort(
    (a, b) => {
      const dateA = new Date(b.lastMessageSentAt).getTime();
      const dateB = new Date(a.lastMessageSentAt).getTime();
      const differenceInMilliseconds = dateA - dateB;
      return differenceInMilliseconds;
    }
  );
  const handleOnUserClick = (userId: number) => {
    setSelectedUserId(userId);
    setLocation(`/inbox/${userId}`);
  };
  return (
    <Box
      sx={{
        maxHeight: "425px",
        overflowY: "auto",
      }}
    >
      {sortedRecipients ? (
        sortedRecipients.map((recipientsOfSidebarConversation, index) => (
          <Box
            key={index}
            onClick={() =>
              handleOnUserClick(recipientsOfSidebarConversation.id)
            }
            sx={{
              cursor: "pointer",
              display: "flex",
              backgroundColor:
                recipientsOfSidebarConversation.id === parseInt(userId!)
                  ? "rgba(163, 157, 146, 0.1)"
                  : null,
              alignItems: "center",
              padding: "16px",
              "&:hover": {
                backgroundColor: "rgba(163, 157, 146, 0.05)",
              },
            }}
          >
            {!recipientsOfSidebarConversation.avatar ? (
              <AccountCircle
                sx={{ width: "48px", height: "48px", color: "grey" }}
              />
            ) : (
              <Avatar
                sx={{ marginRight: "5px" }}
                src={`${recipientsOfSidebarConversation.avatar}`}
              />
            )}
            <Box
              sx={{
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-start",
              }}
            >
              <Typography sx={{ fontSize: "16px" }}>
                {recipientsOfSidebarConversation.username}
              </Typography>
              <Typography sx={{ fontSize: "14px", color: "#4D4D4D" }}>
                {displayLastMessage(
                  recipientsOfSidebarConversation.lastMessageSent.content
                )}
              </Typography>
            </Box>
          </Box>
        ))
      ) : (
        <Typography>no messagessss</Typography>
      )}
    </Box>
  );
};
