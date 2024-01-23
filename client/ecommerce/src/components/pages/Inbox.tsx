import {
  Box,
  Button,
  Container,
  Typography,
} from "@mui/material";
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

export const Inbox = () => {
  const params = useParams();
  const { user } = useUserContext();
  const [location, setLocation] = useLocation();
  const userId = params?.userId;
  const below1200 = useMediaQuery(1200);
  const below960 = useMediaQuery(960);
  const below1600 = useMediaQuery(1600);
  const { data: conversations, isLoading: isConversationsLoading } =
    useAllConversations();
    
  console.log(conversations);
  console.log(user);
  
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
  console.log(user);
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
        };
      }
    }
  );
  console.log(recipientsOfSidebarConversations);

  console.log(conversations);
  const ExistingChat = () => {
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
                recipientsOfSidebarConversations={
                  recipientsOfSidebarConversations
                }
              />
            </Box>
          )}
          <Box>
            {/* check if userId is valid (find user with that userId) */}
            {userId && (
              <>
                <InboxChatNavbar userId={userId}/>
                <Box sx={{ maxHeight: "335px", overflowY: "scroll" }}>
                  <InboxChatContent userId={userId}  />
                </Box>
                <InboxChatInput userId={userId} />
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
                recipientsOfSidebarConversations={
                  recipientsOfSidebarConversations
                }
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
                <InboxChatNavbar message="New Message" />
                <Box sx={{ display: "block", width: "100%" }}>
                  <InboxChatInput userId={extractUserIdFromParam(userId)} />
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
