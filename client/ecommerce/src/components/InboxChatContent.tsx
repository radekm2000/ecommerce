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
            <Box sx={{ display: "flex", alignItems: "center" }}>
              {message.author.username !== user.username ? (
                message.author.avatar ? (
                  <Avatar
                    src={message.author.avatar}
                    sx={{ marginRight: "5px" }}
                  />
                ) : (
                  <AccountCircle
                    sx={{
                      color: "grey",
                      width: "40px",
                      height: "40px",
                      marginRight: "5px",
                    }}
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
