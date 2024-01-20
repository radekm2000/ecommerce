import { Box, Typography } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
const displayLastMessage = (message: string) => {
  if (message.length > 20) {
    return message.slice(0, 20).concat("...");
  }
  return message;
};
const mockUsers = [
  {
    username: "user1",
    lastMessage: "message",
  },
  {
    username: "user2",
    lastMessage: "messagedddddddddddddddddd",
  },
  {
    username: "user3",
    lastMessage: "mess",
  },
  {
    username: "user4",
    lastMessage: "messaaage",
  },
  {
    username: "user5",
    lastMessage: "messaghahpxe",
  },
  {
    username: "user5",
    lastMessage: "messaghahpxe",
  },
  {
    username: "user5",
    lastMessage: "messaghahpxe",
  },
  {
    username: "user6",
    lastMessage: "messaghahpxe",
  },
];

export const InboxSidebar = () => {
  return (
    <Box
      sx={{
        borderRight: "1px solid rgba(23, 23, 23, 0.08)",
        overflowY: "scroll",
        maxHeight: '425px'
      }}
    >
      {mockUsers.map((mockUser) => (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            padding: "16px",
            "&:hover": {
              backgroundColor: "rgba(163, 157, 146, 0.1)",
            },
          }}
        >
          <AccountCircle
            sx={{ width: "48px", height: "48px", color: "grey" }}
          />
          <Box
            sx={{
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <Typography sx={{ fontSize: "16px" }}>
              {mockUser.username}
            </Typography>
            <Typography sx={{ fontSize: "14px", color: "#4D4D4D" }}>
              {displayLastMessage(mockUser.lastMessage)}
            </Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
};
