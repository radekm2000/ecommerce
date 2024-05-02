import { Box, Input } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useState } from "react";
import { createConversationAndSendFirstMessage } from "../../api/axios";
import { useLocation } from "wouter";
import { Conversation } from "../../types/types";
import { useUserContext } from "../../contexts/UserContext";
import { useNotificationMutation } from "../../hooks/useNotificationMutation";
import toast from "react-hot-toast";
import { useUploadMessageImageMutation } from "../../hooks/useUploadMessageImageMutation";

export const InboxChatInput = ({
  userId,
  selectedUserConversation,
}: {
  userId: string;
  selectedUserConversation: Conversation | undefined;
}) => {
  const [isDragging, setIsDragging] = useState(false);

  const queryClient = useQueryClient();
  const { user: meUser } = useUserContext();
  const [message, setMessage] = useState<string>("");
  const [, setLocation] = useLocation();
  const formData = new FormData();
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

  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const uploadImageMutation = useUploadMessageImageMutation(parseInt(userId));
  const { mutate } = mutation;
  const notificationMutation = useNotificationMutation();
  const { mutate: mutateNotification } = notificationMutation;
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      mutate(message);
      setMessage("");
      mutateNotification({
        isRead: false,
        receiverId: parseInt(userId),
        senderId: meUser.id,
      });
    }
  };
  return (
    <Box
      sx={{
        backgroundColor: isDragging ? "rgba(23, 23, 23, 0.05)" : null,

        padding: "16px 8px",
        height: "auto",
        borderTop: "1px solid rgba(23, 23, 23, 0.08)",
      }}
    >
      <Input
        onDragEnter={handleDragEnter}
        onDragOver={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={async (e) => {
          e.preventDefault();
          const files = e.dataTransfer.files;
          const file = files[0];

          if (!file.type.startsWith("image/")) {
            toast.error("Only images are supported for now");
            return;
          }
          formData.append("file", file);
          uploadImageMutation.mutate(formData);
          mutateNotification({
            isRead: false,
            receiverId: parseInt(userId),
            senderId: meUser.id,
          });
          
        }}
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
