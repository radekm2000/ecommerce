import { Box, Typography } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Redirect, useLocation, useParams } from "wouter";
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
    id: 130,
  },
  {
    username: "user2",
    lastMessage: "messagedddddddddddddddddd",
    id: 135,
  },
  {
    username: "user3",
    lastMessage: "mess",
    id: 134,
  },
  {
    username: "user4",
    lastMessage: "messaaage",
    id: 134,
  },

  {
    username: "user5",
    lastMessage: "messaghahpxe",
    id: 134,
  },
  {
    username: "user5",
    lastMessage: "messaghahpxe",
    id: 134,
  },
  {
    username: "user5",
    lastMessage: "messaghahpxe",
    id: 134,
  },
  {
    username: "user6",
    lastMessage: "messaghahpxe",
    id: 134,
  },
];

export const InboxSidebar = () => {
  const [, setLocation] = useLocation();
  const params = useParams();
  const userId = params?.userId;
    
  const handleOnUserClick = (userId: number) => {
    setLocation(`/inbox/${userId}`);
  };
  return (
    <Box
      sx={{
        borderRight: "1px solid rgba(23, 23, 23, 0.08)",
        overflowY: "scroll",
        maxHeight: "425px",
      }}
    >
      {mockUsers.map((mockUser) => (
        <Box
          onClick={() => handleOnUserClick(mockUser.id)}
          sx={{
            cursor: "pointer",
            display: "flex",
            backgroundColor:
              mockUser.id === parseInt(userId!)
                ? "rgba(163, 157, 146, 0.1)"
                : null,
            alignItems: "center",
            padding: "16px",
            "&:hover": {
              backgroundColor: "rgba(163, 157, 146, 0.05)",
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
