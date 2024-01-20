import AccountCircle from "@mui/icons-material/AccountCircle";
import { Box, Input, List, ListItem, ListItemText } from "@mui/material";
import { useState } from "react";

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
      content: "a gram sobie na komputerze ogladam filmy tancze robie rozne",
      author: recipient2,
    },
    {
      id: 4,
      content: "a gram sobie na komputerze ogladam filmy tancze robie rozne",
      author: recipient2,
    },
    {
      id: 4,
      content: "a gram sobie na komputerze ogladam filmy tancze robie rozne",
      author: recipient2,
    },
    {
      id: 4,
      content: "a gram sobie na komputerze ogladam filmy tancze robie rozne",
      author: recipient2,
    },
  ],
};

export const InboxChatContent = () => {
  const [message, setMessage] = useState<string>("");
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };
  return (
    <>
      <List sx={{ width: "100%" }}>
        {conversation.messages.map((message, index) => (
          <ListItem
            key={index}
            sx={{
              justifyContent:
                message.author === recipient1 ? "flex-start" : "flex-end",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex" }}>
              {message.author === recipient1 ? (
                <AccountCircle
                  sx={{ color: "grey", width: "40px", height: "40px" }}
                />
              ) : null}
              <ListItemText
                sx={{
                  padding: "8px",
                  borderRadius: "5px",
                  textAlign: "left",
                  border: "1px solid rgba(23, 23, 23, 0.08)",
                  backgroundColor:
                    message.author === recipient2
                      ? "rgba(163, 157, 146, 0.15)"
                      : null,
                }}
                primary={message.content}
              ></ListItemText>
            </Box>
          </ListItem>
        ))}
      </List>
    </>
  );
};
