import AccountCircle from "@mui/icons-material/AccountCircle";
import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { useEffect, useRef } from "react";
import { Conversation, UserWithFollows } from "../types/types";
import { useUserContext } from "../contexts/UserContext";

const recipient1 = {
  username: "radek",
};
const recipient2 = {
  username: "magda",
};

const conversation = {
  recipient1: recipient1,
  recipient2: recipient2,
  messages: [
    {
      id: 1,
      content: "aha co tam babeczko",
      author: recipient1,
    },
    {
      id: 2,
      content: "aha dobra co masz na sprzedaz",
      author: recipient2,
    },
    {
      id: 3,
      content: "a u ciebie co slychac",
      author: recipient1,
    },
    {
      id: 4,
      content: "a gram sobie na komputerze ",
      author: recipient2,
    },
    {
      id: 4,
      content:
        "a gram sobie na komputerze ogladam filmy tancze robie rozne pomarancze ",
      author: recipient2,
    },
    {
      id: 4,
      content: `Ok3`,
      author: recipient2,
    },
    {
      id: 4,
      content: "a gram sobie na komputerze ogladam filmy tancze robie rozne",
      author: recipient2,
    },
  ],
};

export const InboxChatContent = ({
  selectedUserConversation,
}: {
  selectedUserConversation: Conversation | undefined;
}) => {
  const { user } = useUserContext();
  const divRef = useRef<null | HTMLDivElement>(null);
  <Typography ref={divRef}></Typography>;

  useEffect(() => {
    divRef?.current?.scrollIntoView({ behavior: "instant" });
  });

  const xp = () => {
    return (
      <List sx={{}}>
        {selectedUserConversation &&
          selectedUserConversation.messages.map((message, index) => (
            <ListItem
              key={index}
              sx={{
                justifyContent:
                  message.author.username !== user.username
                    ? "flex-start"
                    : "flex-end",
                alignItems: "center",
              }}
            >
              <Box sx={{ display: "flex" }}>
                {message.author.username !== user.username ? (
                  message.author.avatar ? (
                    <Avatar src={message.author.avatar} />
                  ) : (
                    <AccountCircle
                      sx={{ color: "grey", width: "40px", height: "40px" }}
                    />
                  )
                ) : null}
                <ListItemText
                  sx={{
                    alignItems: "flex-end",
                    padding: "8px",
                    borderRadius: "5px",
                    textAlign: "left",
                    border: "1px solid rgba(23, 23, 23, 0.08)",
                    backgroundColor:
                      message.author.username === user.username
                        ? "rgba(163, 157, 146, 0.15)"
                        : null,
                  }}
                >
                  {message.content}
                  <Typography ref={divRef}></Typography>
                </ListItemText>
              </Box>
            </ListItem>
          ))}
      </List>
    );
  };

  return (
    <List sx={{}}>
      {selectedUserConversation &&
        selectedUserConversation.messages.map((message, index) => (
          <ListItem
            key={index}
            sx={{
              justifyContent:
                message.author.username !== user.username
                  ? "flex-start"
                  : "flex-end",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex" }}>
              {message.author.username !== user.username ? (
                message.author.avatar ? (
                  <Avatar src={message.author.avatar} />
                ) : (
                  <AccountCircle
                    sx={{ color: "grey", width: "40px", height: "40px" }}
                  />
                )
              ) : null}
              <ListItemText
                sx={{
                  alignItems: "flex-end",
                  padding: "8px",
                  borderRadius: "5px",
                  textAlign: "left",
                  border: "1px solid rgba(23, 23, 23, 0.08)",
                  backgroundColor:
                    message.author.username === user.username
                      ? "rgba(163, 157, 146, 0.15)"
                      : null,
                }}
              >
                {message.content}
                <Typography ref={divRef}></Typography>
              </ListItemText>
            </Box>
          </ListItem>
        ))}
    </List>
  );
};
