import { Box, Input } from "@mui/material";
import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { useState } from "react";
import { createConversationAndSendFirstMessage } from "../api/axios";
import { useLocation } from "wouter";
import { Conversation } from "../types/types";

export const InboxChatInput = ({
  userId,
  selectedUserConversation,
}: {
  userId: string;
  selectedUserConversation: Conversation | undefined;
}) => {
  const queryClient = useQueryClient();

  const [message, setMessage] = useState<string>("");
  const [, setLocation] = useLocation();
  const mutation = useMutation({
    mutationKey: ["sendFirstMessage", userId],
    mutationFn: (content: string) => {
      return createConversationAndSendFirstMessage(content, parseInt(userId));
    },
    onSuccess: (data: { conversation: Conversation; isNew: boolean }) => {
      queryClient.invalidateQueries({
        queryKey: [`conversations/users/${userId}`],
      });
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
      if (data.isNew) {
        setLocation(`/inbox`);
      }
    },
    onError: (err) => {
      console.log(err);
    },
  });
  const { mutate } = mutation;
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      mutate(message);
      setMessage("");
    }
  };
  return (
    <Box
      sx={{
        padding: "16px 8px",
        height: "auto",
        borderTop: "1px solid rgba(23, 23, 23, 0.08)",
      }}
    >
      <Input
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => handleKeyDown(e)}
        inputProps={{ spellCheck: false }}
        placeholder={`Write a message here`}
        disableUnderline
        value={message}
        multiline
        fullWidth
        maxRows={2}
        sx={{
          borderRadius: "3px",
          backgroundColor: "rgba(23, 23, 23, 0.08)",
          width: "100%",
          padding: "16px 8px",
          fontSize: "18px",
        }}
      />
    </Box>
  );
};
