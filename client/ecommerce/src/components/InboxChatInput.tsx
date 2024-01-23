import { Box, Input } from "@mui/material";
import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useState } from "react";
import { createConversationAndSendFirstMessage } from "../api/axios";
import { useLocation } from "wouter";
import { navigate } from "wouter/use-location";
import { Conversation } from "../types/types";

export const InboxChatInput = ({
  userId,
  selectedUserConversations,
}: {
  userId: string;
  selectedUserConversations: Conversation[] | undefined;
}) => {
  const queryClient = useQueryClient();
  const [message, setMessage] = useState<string>("");
  const [, setLocation] = useLocation();
  console.log("user id w inpucie");
  console.log(userId);

  const mutation = useMutation({
    mutationKey: ["sendFirstMessage", userId],
    mutationFn: (content: string) => {
      return createConversationAndSendFirstMessage(content, parseInt(userId));
    },
    onSuccess: (data: { conversation: Conversation; isNew: boolean }) => {
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
      console.log("wiadomosc udalo sie wsslac");
      if (data.isNew) {
        setTimeout(() => {
          setLocation(`/inbox/${userId}`, { replace: true });
        }, 1000);
      }
      console.log(data);
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
