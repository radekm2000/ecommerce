import AccountCircle from "@mui/icons-material/AccountCircle";
import { Box, List, ListItem, ListItemText, Typography } from "@mui/material";
import { useEffect, useRef } from "react";
import { UserWithFollows } from "../types/types";

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
      content: `Określ, ile imion chcesz wygenerować, opcjonalnie wybierz płeć i jeśli chceOkreśl, ile imion chcesz wygenerować, opcjonalnie wybierz płeć i jeśli chce.Określ, ile imion chcesz wygenerować, opcjonalnie wybierz płeć i jeśli chce..123`,
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
  const divRef = useRef<null | HTMLDivElement>(null);
  <Typography ref={divRef}></Typography>;

  useEffect(() => {
    divRef?.current?.scrollIntoView({ behavior: "instant" });
  });
  return (
    <List sx={{}}>
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
                alignItems: "flex-end",
                padding: "8px",
                borderRadius: "5px",
                textAlign: "left",
                border: "1px solid rgba(23, 23, 23, 0.08)",
                backgroundColor:
                  message.author === recipient2
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
