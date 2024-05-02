import {
  Avatar,
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Container,
  Divider,
  Select,
  Typography,
} from "@mui/material";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import AddCommentOutlinedIcon from "@mui/icons-material/AddCommentOutlined";
import { InboxSidebar } from "../inbox/InboxSidebar";
import { InboxChatNavbar } from "../inbox/InboxChatNavbar";
import { InboxChatContent } from "../inbox/InboxChatContent";
import { Route, Switch, useLocation, useParams } from "wouter";
import { InboxChatInput } from "../inbox/InboxChatInput";
import { useAllConversations } from "../../hooks/useAllConversations";
import { useUserContext } from "../../contexts/UserContext";
import { getRecipientFromConversation } from "../../utils/getRecipientFromConversation";
import { useEffect, useState } from "react";
import { useUserConversations } from "../../hooks/useUserConversations";
import { ConversationDetailsNavbar } from "../conversation-details/ConversationDetailsNavbar";
import { ConversationDetailsContent } from "../conversation-details/ConversationDetailsContent";
import { useNotifications } from "../../hooks/useNotifications";
import { InboxSkeleton } from "../skeletons/InboxSkeleton";
import { InboxSearchCard } from "../inbox/InboxSearchCard";
import { useDebounce } from "../../hooks/useDebounce";
import { useFetchUsersBySearchInput } from "../../hooks/useFetchUsersBySearchInput";
import { AccountCircle } from "@mui/icons-material";

export const Inbox = () => {
  const params = useParams();
  const { user } = useUserContext();
  const [location, setLocation] = useLocation();
  const userId = params?.userId;
  const below1200 = useMediaQuery(1200);
  const below960 = useMediaQuery(960);
  const below1600 = useMediaQuery(1600);
  // const [selectedImage, setSelectedImage] = useState<File | "">("");

  const [isNewChatClicked, setIsNewChatClicked] = useState(false);
  const handleClick = () => {
    setIsNewChatClicked(true);
    setLocation("/inbox/new");
  };
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

  if (!notificationsReceived) {
    return "no Notifications";
  }

  if (
    isSelectedUserConversationsLoading ||
    isNotificationsLoading ||
    isConversationsLoading
  ) {
    return <InboxSkeleton />;
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
                <Button onClick={handleClick}>
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
                        userId={Number(userId)}
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

  const SelectUserToNewChat = () => {
    const [chosenUserId, setChosenUserId] = useState<null | number>(null);
    const [searchInputValue, setSearchInputValue] = useState("");
    const debouncedInput = useDebounce(searchInputValue);

    const [isSearchedIconClicked, setIsSearchedIconClicked] = useState(false);
    const { data: filteredUsers } = useFetchUsersBySearchInput(debouncedInput);
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
                <Button onClick={handleClick}>
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
            }}
          >
            <Box
              sx={{
                height: "52px",
                display: "flex",
                justifyContent: "center",
                textAlign: "left",
                alignItems: "center",
                borderBottom: "1px solid rgba(23, 23, 23, 0.08)",
                padding: "4px",
              }}
            >
              <Typography sx={{ color: "black", margin: "0 auto" }}>
                New message
              </Typography>
              <Divider />
            </Box>
            <Box>
              <Box sx={{ display: "flex", padding: "16px" }}>
                <InboxSearchCard
                  searchInputValue={searchInputValue}
                  setSearchInputValue={setSearchInputValue}
                  setIsSearchedIconClicked={setIsSearchedIconClicked}
                />
              </Box>
              <Divider />
              {debouncedInput && filteredUsers && isSearchedIconClicked && (
                <Card
                  sx={{
                    width: "100%",
                    height: "281px",
                    boxShadow: "none",
                    overflowY: "auto",
                  }}
                >
                  {filteredUsers.map((user, index) => (
                    <CardActionArea
                      onClick={() => {
                        setSearchInputValue(user.username);
                        setChosenUserId(user.id);

                        setIsSearchedIconClicked(false);
                      }}
                    >
                      <CardContent key={index} sx={{ display: "flex" }}>
                        
                        <Box sx={{ display: "flex", gap: "10px" }}>
                          {user.avatar ? (
                            <Avatar src={user.avatar} />
                          ) : (
                            <AccountCircle
                              sx={{
                                color: "grey",
                                width: "24px",
                                height: "24px",
                              }}
                            />
                          )}
                          <Typography sx={{}}>{user.username}</Typography>
                        </Box>
                      </CardContent>
                      <Divider />
                    </CardActionArea>
                  ))}
                </Card>
              )}
            </Box>

            {chosenUserId && (
              <Box sx={{ marginTop: "auto" }}>
                <InboxChatInput
                  userId={String(chosenUserId)}
                  selectedUserConversation={undefined}
                />
              </Box>
            )}
            {/* check if userId is valid (find user with that userId) */}
            {/* {userId && (
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
            )} */}
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
                <Button onClick={handleClick}>
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
  } else if (location === "/inbox/new") {
    return <SelectUserToNewChat />;
  }

  return (
    <Switch>
      <Route path="/inbox/new/:userId">
        <NewChat />
      </Route>
      <Route path="/inbox/:userId">
        <ExistingChat />
      </Route>
      <Route path="/inbox/new"></Route>
      <SelectUserToNewChat />
    </Switch>
  );
};
