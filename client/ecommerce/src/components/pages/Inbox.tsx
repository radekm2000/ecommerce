import { Box, Button, Container, Typography } from "@mui/material";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import AddCommentOutlinedIcon from "@mui/icons-material/AddCommentOutlined";
import { InboxSidebar } from "../InboxSidebar";
import { InboxChatNavbar } from "../InboxChatNavbar";
import { InboxChatContent } from "../InboxChatContent";
import { Route, Switch, useLocation, useParams } from "wouter";
import { InboxChatInput } from "../InboxChatInput";
import { useAllConversations } from "../../hooks/useAllConversations";
import { useUserContext } from "../../contexts/UserContext";
import { getRecipientFromConversation } from "../../utils/getRecipientFromConversation";
import { useState } from "react";
import { useUserConversations } from "../../hooks/useUserConversations";
import { ConversationDetailsNavbar } from "../conversation-details/ConversationDetailsNavbar";
import { ConversationDetailsContent } from "../conversation-details/ConversationDetailsContent";
import { useNotifications } from "../../hooks/useNotifications";

export const Inbox = () => {
  const params = useParams();
  const { user } = useUserContext();
  const [location, setLocation] = useLocation();
  const userId = params?.userId;
  const below1200 = useMediaQuery(1200);
  const below960 = useMediaQuery(960);
  const below1600 = useMediaQuery(1600);
  const [isConversationDetailsOpen, setisConversationDetailsOpen] =
    useState<boolean>(false);
  const [selectedUserId, setSelectedUserId] = useState<number>(0);
  const { data: conversations, isLoading: isConversationsLoading } =
    useAllConversations();

  const { data: notificationsReceived, isLoading: isNotificationsLoading } =
    useNotifications(user.id);

  const {
    data: selectedUserConversation,
    isLoading: isSelectedUserConversationsLoading,
  } = useUserConversations(selectedUserId);

  if (isSelectedUserConversationsLoading) {
    return "isLoading...";
  }
  if (isNotificationsLoading) {
    return "notifications loading...";
  }
  if (!notificationsReceived) {
    return "no Notifications";
  }

  if (isConversationsLoading) {
    return "isLoading...";
  }

  const extractUserIdFromParam = (param: string) => {
    if (param.startsWith("new/")) {
      const userIdParam = param.replace("new/", "");
      return userIdParam;
    } else {
      return param;
    }
  };
  const recipientsOfSidebarConversations = (conversations ?? []).map(
    (conversation) => {
      if (user.username) {
        const recipient = getRecipientFromConversation(
          conversation,
          user.username
        );

        return {
          ...recipient,
          lastMessageSent: conversation.lastMessageSent,
          lastMessageSentAt: conversation.lastMessageSentAt,
        };
      }
    }
  );

  const ExistingChat = () => {
    return (
      <Container
        maxWidth={false}
        sx={{
          maxWidth: "1280px",
          margin: below1600 ? null : "0px 150px",
          display: "flex",
          padding: "20px 20px",
          minHeight: "500px",
        }}
      >
        <Box
          sx={{
            width: below1200 ? "100%" : "75%",
            border: "1px solid rgba(23, 23, 23, 0.08)",
            display: "flex",
          }}
        >
          {below960 ? null : (
            <Box
              sx={{
                flex: "0 0 300px",
                borderRight: "1px solid rgba(23, 23, 23, 0.08)",
              }}
            >
              <Box
                sx={{
                  height: "52px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderRight: "1px solid rgba(23, 23, 23, 0.08)",
                  borderBottom: "1px solid rgba(23, 23, 23, 0.08)",
                  padding: "4px",
                }}
              >
                <Typography
                  sx={{ fontSize: "16px", padding: "8px", fontWeight: "500" }}
                >
                  Inbox
                </Typography>
                <Button>
                  <AddCommentOutlinedIcon
                    sx={{
                      color: "#007782",
                      width: "24px",
                      height: "24px",
                    }}
                  />
                </Button>
              </Box>
              <InboxSidebar
                setSelectedUserId={setSelectedUserId}
                recipientsOfSidebarConversations={
                  recipientsOfSidebarConversations
                }
                notifications={notificationsReceived}
              />
            </Box>
          )}
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {userId && (
              <>
                {isConversationDetailsOpen ? (
                  <>
                    <ConversationDetailsNavbar
                      isConversationDetailsOpen={isConversationDetailsOpen}
                      setIsConversationDetailsOpen={
                        setisConversationDetailsOpen
                      }
                    />
                    <ConversationDetailsContent
                      selectedUserConversation={selectedUserConversation}
                    />
                  </>
                ) : (
                  <>
                    <InboxChatNavbar
                      setIsConversationDetailsOpen={
                        setisConversationDetailsOpen
                      }
                      isConversationDetailsOpen={isConversationDetailsOpen}
                      selectedUserConversation={selectedUserConversation}
                    />
                    <Box sx={{ maxHeight: "335px", overflowY: "auto" }}>
                      <InboxChatContent
                        selectedUserConversation={selectedUserConversation}
                      />
                    </Box>
                    <Box sx={{ marginTop: "auto" }}>
                      <InboxChatInput
                        userId={userId}
                        selectedUserConversation={selectedUserConversation}
                      />
                    </Box>
                  </>
                )}
              </>
            )}
          </Box>
        </Box>
        <Box sx={{ width: below1200 ? "none" : "25%" }}></Box>
      </Container>
    );
  };

  const NewChat = () => {
    return (
      <Container
        maxWidth={false}
        sx={{
          maxWidth: "1280px",
          margin: below1600 ? null : "0px 150px",
          display: "flex",
          padding: "20px 20px",
        }}
      >
        <Box
          sx={{
            width: below1200 ? "100%" : "75%",
            border: "1px solid rgba(23, 23, 23, 0.08)",
            display: "flex",
          }}
        >
          {below960 ? null : (
            <Box
              sx={{
                flex: "0 0 300px",
                borderRight: "1px solid rgba(23, 23, 23, 0.08)",
              }}
            >
              <Box
                sx={{
                  height: "52px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderRight: "1px solid rgba(23, 23, 23, 0.08)",
                  borderBottom: "1px solid rgba(23, 23, 23, 0.08)",
                  padding: "4px",
                }}
              >
                <Typography
                  sx={{ fontSize: "16px", padding: "8px", fontWeight: "500" }}
                >
                  Inbox
                </Typography>
                <Button>
                  <AddCommentOutlinedIcon
                    sx={{
                      color: "#007782",
                      width: "24px",
                      height: "24px",
                    }}
                  />
                </Button>
              </Box>
              <InboxSidebar
                setSelectedUserId={setSelectedUserId}
                recipientsOfSidebarConversations={
                  recipientsOfSidebarConversations
                }
                notifications={notificationsReceived}
              />
            </Box>
          )}
          <Box
            sx={{
              width: "100%",
              height: "500px",
              display: "flex",
              flexDirection: "column",

              justifyContent: "space-between",
            }}
          >
            {/* check if userId is valid (find user with that userId) */}
            {userId && (
              <>
                <InboxChatNavbar
                  selectedUserConversation={selectedUserConversation}
                />
                <Box sx={{ display: "block", width: "100%" }}>
                  <InboxChatInput
                    selectedUserConversation={selectedUserConversation}
                    userId={extractUserIdFromParam(userId)}
                  />
                </Box>
              </>
            )}
          </Box>
        </Box>
        <Box sx={{ width: below1200 ? "none" : "25%" }}></Box>
      </Container>
    );
  };
  if (location === "/inbox" && !userId) {
    return <NewChat />;
  }
  return (
    <Switch>
      <Route path="/inbox/new/:userId">
        <NewChat />
      </Route>
      <Route path="/inbox/:userId">
        <ExistingChat />
      </Route>
    </Switch>
  );
};
