import { Avatar, Box, Button, Typography } from "@mui/material";
import { useUserContext } from "../../contexts/UserContext";
import { Conversation } from "../../types/types";
import { getRecipientFromConversation } from "../../utils/getRecipientFromConversation";
import { AccountCircle } from "@mui/icons-material";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import { useLocation } from "wouter";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteConversation } from "../../api/axios";
import toast from "react-hot-toast";
import { useDeleteNotificationsOfConversation } from "../../hooks/useDeleteNotificationsOfConversation";
export const ConversationDetailsContent = ({
  selectedUserConversation,
  setIsConversationDetailsOpen,
}: {
  selectedUserConversation: Conversation | undefined;
  setIsConversationDetailsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { user } = useUserContext();
  const [, navigate] = useLocation();
  const queryClient = useQueryClient();
  const recipientOfConversation = getRecipientFromConversation(
    selectedUserConversation!,
    user.username
  );
  const handleUserClick = () => {
    navigate(`/members/${recipientOfConversation?.id}`);
  };

  const deleteNotificationsMutation = useDeleteNotificationsOfConversation();

  const mutation = useMutation({
    mutationKey: [`conversations/${selectedUserConversation?.id}`],
    mutationFn: deleteConversation,
    onSuccess: () => {
      toast.success("Conversation deleted");
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
      navigate("/inbox");
      setIsConversationDetailsOpen(false);
      deleteNotificationsMutation.mutate({
        receiverId: selectedUserConversation!.creator.id,
        senderId: selectedUserConversation!.recipient.id,
      });
    },
    onError: (error) => {
      toast.error("Something went wrong");
    },
  });
  const { mutate } = mutation;
  const useDeleteConversation = () => {
    mutate(selectedUserConversation!.id);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
      }}
    >
      <Box
        sx={{
          borderTop: "1px solid rgba(23, 23, 23, 0.08)",
          borderBottom: "1px solid rgba(23, 23, 23, 0.08)",
          display: "flex",
          padding: "16px",
          width: "auto",
          alignItems: "center",
        }}
      >
        <Button
          onClick={handleUserClick}
          sx={{
            textTransform: "none",
            color: "#171717",
            width: "100%",
            display: "flex",
            justifyContent: "flex-start",
          }}
        >
          {recipientOfConversation?.avatar ? (
            <Avatar
              sx={{ width: "32px", height: "32px" }}
              src={recipientOfConversation?.avatar}
            />
          ) : (
            <AccountCircle
              sx={{ color: "grey", width: "32px", height: "32px" }}
            />
          )}
          <Typography sx={{ marginLeft: "2px", padding: "8px" }}>
            {recipientOfConversation?.username}
          </Typography>
        </Button>
      </Box>
      <Box
        sx={{
          padding: "16px",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <Button
          onClick={useDeleteConversation}
          sx={{
            textTransform: "none",
            width: "100%",
            display: "flex",
            justifyContent: "flex-start",
            color: "#171717",
          }}
          startIcon={<DeleteForeverOutlinedIcon sx={{ color: "#fe2e2e" }} />}
        >
          Delete conversation
        </Button>
      </Box>
    </Box>
  );
};
