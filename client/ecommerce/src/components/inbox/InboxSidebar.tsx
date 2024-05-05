import { Avatar, Badge, Box, Typography } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useLocation, useParams } from "wouter";
import {
  FetchedNotifications,
  Message,
  RecipientOfSidebarConversation,
} from "../../types/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { markNotificationsAsRead } from "../../api/axios";
import { RenderAvatar } from "../RenderAvatar";
const displayLastMessage = (lastMessage: Message) => {
  if (!lastMessage) {
    return "";
  }
  if (!lastMessage.content && lastMessage.imageName) {
    return "User sent a photo";
  }
  if (lastMessage.content.length > 20) {
    return lastMessage.content.slice(0, 20).concat("...");
  }

  return lastMessage.content;
};

export const InboxSidebar = ({
  recipientsOfSidebarConversations,
  setSelectedUserId,
  notifications,
}: {
  setSelectedUserId: React.Dispatch<React.SetStateAction<number>>;
  recipientsOfSidebarConversations:
    | RecipientOfSidebarConversation[]
    | undefined;
  notifications: FetchedNotifications[];
}) => {
  // const { notifications } = useNotificationsContext();
  const [, setLocation] = useLocation();
  const params = useParams();
  const userId = params?.userId;
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: markNotificationsAsRead,
    mutationKey: [`notifications`, `update`],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
    onError: (err) => {
      console.log(err);
    },
  });
  const sortedRecipients = [...recipientsOfSidebarConversations!].sort(
    (a, b) => {
      const dateA = new Date(b.lastMessageSentAt).getTime();
      const dateB = new Date(a.lastMessageSentAt).getTime();
      const differenceInMilliseconds = dateA - dateB;
      return differenceInMilliseconds;
    }
  );
  const sortedRecipientsWithNotifications = sortedRecipients.map(
    (sortedRecipient) => {
      const recipientNotifications = notifications.filter((notification) => {
        return notification.sender.id === sortedRecipient.id;
      });
      return { ...sortedRecipient, notifications: recipientNotifications };
    }
  );
  const handleOnUserClick = (userId: number) => {
    const { mutate } = mutation;

    mutate(userId);
    setSelectedUserId(userId);
    setLocation(`/inbox/${userId}`);
  };
  return (
    <Box
      sx={{
        maxHeight: "425px",
        overflowY: "auto",
      }}
    >
      {sortedRecipientsWithNotifications ? (
        sortedRecipientsWithNotifications.map(
          (recipientsOfSidebarConversation, index) => (
            <Box
              key={index}
              onClick={() =>
                handleOnUserClick(recipientsOfSidebarConversation.id)
              }
              sx={{
                cursor: "pointer",
                display: "flex",
                backgroundColor:
                  recipientsOfSidebarConversation.id === parseInt(userId!)
                    ? "rgba(163, 157, 146, 0.1)"
                    : null,
                alignItems: "center",
                padding: "16px",
                "&:hover": {
                  backgroundColor: "rgba(163, 157, 146, 0.05)",
                },
              }}
            >
              {/* {!recipientsOfSidebarConversation.avatar ? (
                <AccountCircle
                  sx={{ width: "48px", height: "48px", color: "grey" }}
                />
              ) : (
                <Avatar
                  sx={{ marginRight: "5px" }}
                  src={`${recipientsOfSidebarConversation.avatar}`}
                />
              )} */}
              <RenderAvatar
                width="48px"
                height="48px"
                user={recipientsOfSidebarConversation}
                marginRight="5px"
              />
              <Box
                sx={{
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "flex-start",
                }}
              >
                <Box sx={{ display: "flex", gap: "10px" }}>
                  {recipientsOfSidebarConversation.notifications.length > 0 &&
                  recipientsOfSidebarConversation.notifications.some(
                    (notification) => !notification.isRead
                  ) ? (
                    <>
                      <Typography sx={{ fontSize: "16px" }}>
                        {recipientsOfSidebarConversation.username}
                      </Typography>
                      <Badge
                        color="error"
                        badgeContent={
                          recipientsOfSidebarConversation.notifications.filter(
                            (notification) => !notification.isRead
                          ).length
                        }
                      ></Badge>
                    </>
                  ) : (
                    <Typography sx={{ fontSize: "16px" }}>
                      {recipientsOfSidebarConversation.username}
                    </Typography>
                  )}
                </Box>
                <Typography sx={{ fontSize: "14px", color: "#4D4D4D" }}>
                  {displayLastMessage(
                    recipientsOfSidebarConversation.lastMessageSent
                  )}
                </Typography>
              </Box>
            </Box>
          )
        )
      ) : (
        <Typography>no messages</Typography>
      )}
    </Box>
  );
};
