import AccountCircle from "@mui/icons-material/AccountCircle";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import {
  Avatar,
  Box,
  Button,
  CardMedia,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Popover,
  Typography,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { Conversation, UserWithFollows } from "../../types/types";
import { useUserContext } from "../../contexts/UserContext";
import { ImagePreview } from "./ImagePreview";
import { useDeleteMessageMutation } from "../../hooks/useDeleteMessageMutation";
import { RenderAvatar } from "../RenderAvatar";

export const InboxChatContent = ({
  selectedUserConversation,
  userId,
}: {
  selectedUserConversation: Conversation | undefined;
  userId: number;
}) => {
  const [anchorEl, setAnchorEl] = useState<(HTMLButtonElement | null)[]>(
    Array.from(
      { length: selectedUserConversation!.messages.length },
      () => null
    )
  );

  const deleteMessageMutation = useDeleteMessageMutation(userId);

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    index: number
  ) => {
    const newAnchorEl = [...anchorEl];
    newAnchorEl[index] = event.currentTarget;
    setAnchorEl(newAnchorEl);
  };

  const handleClose = (index: number) => {
    const newAnchorEl = [...anchorEl];
    newAnchorEl[index] = null;
    setAnchorEl(newAnchorEl);
  };

  const open = (index: number) => Boolean(anchorEl[index]);

  const [hoveredIndex, setHoveredIndex] = useState<null | number>(null);
  const { user } = useUserContext();

  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "instant" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [selectedUserConversation]);
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
            <Box
              onMouseOver={() => {
                setHoveredIndex(index);
              }}
              onMouseLeave={() => setHoveredIndex(null)}
              sx={{ display: "flex", alignItems: "center" }}
            >
              {/* {message.author.username !== user.username ? (
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
              ) : null} */}
              <RenderAvatar width="40px" height="40px" user={message.author} marginRight="5px"/>
              {message.author.username === user.username &&
                hoveredIndex === index && (
                  <IconButton
                    disableRipple
                    onClick={(e) => handleClick(e, index)}
                    sx={{
                      "&:hover": {
                        backgroundColor: "white",
                      },
                    }}
                  >
                    <MoreVertIcon sx={{ cursor: "pointer", color: "grey" }} />
                  </IconButton>
                )}
              <Popover
                open={open(index)}
                anchorEl={anchorEl[index]}
                onClose={() => handleClose(index)}
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              >
                <Button
                  onClick={() => {
                    deleteMessageMutation.mutate(message.id);
                  }}
                  startIcon={
                    <DeleteOutlineOutlinedIcon sx={{ color: "black" }} />
                  }
                  sx={{ p: 2, textTransform: "none" }}
                >
                  <Typography sx={{ color: "black", fontWeight: "600" }}>
                    Delete
                  </Typography>
                </Button>
              </Popover>

              {message.imageUrl && (
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
                  <ImagePreview image={message.imageUrl} />
                </ListItemText>
              )}
              {message.content && (
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
                </ListItemText>
              )}
              <Typography ref={messagesEndRef}></Typography>
            </Box>
          </ListItem>
        ))}
    </List>
  );
};
