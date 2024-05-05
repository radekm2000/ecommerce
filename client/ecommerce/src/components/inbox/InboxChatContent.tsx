import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import {
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Popover,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { Conversation } from "../../types/types";
import { useUserContext } from "../../contexts/UserContext";
import { ImagePreview } from "./ImagePreview";
import { useDeleteMessageMutation } from "../../hooks/useDeleteMessageMutation";
import { RenderAvatar } from "../RenderAvatar";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { useEditMessageMutation } from "../../hooks/useEditMessageMutation";
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
  const [editedMessage, setEditedMessage] = useState<null | number>(null);
  const [editedMessageContent, setEditedMessageContent] = useState("");
  const [focus, setFocus] = useState<boolean>(false);

  const handleEditClick = (index: number) => {
    setEditedMessage(index);
    setFocus(true);
  };

  const handleEditSave = (index: number) => {
    setEditedMessage(null);
    setEditedMessageContent("");
    setFocus(false);
  };

  const editMessageMutation = useEditMessageMutation(userId);
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
  console.log(selectedUserConversation?.messages);
  useEffect(() => {
    scrollToBottom();
  }, [selectedUserConversation]);

  const sortedMessages =
    selectedUserConversation &&
    selectedUserConversation.messages.slice().sort((a, b) => a.id - b.id);
  return (
    <List sx={{}}>
      {sortedMessages?.map((message, index) => (
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
            <RenderAvatar
              width="40px"
              height="40px"
              user={message.author}
              marginRight="5px"
            />
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
              <Box
                sx={{
                  display: "block",
                  alignItems: "flex-start",
                  justifyContent: "center",
                }}
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
                <Button
                  onClick={() => {
                    setEditedMessageContent(message.content);
                    handleEditClick(index);
                    handleClose(index);
                  }}
                  startIcon={<EditOutlinedIcon sx={{ color: "black" }} />}
                  sx={{ textTransform: "none", p: 2 }}
                >
                  <Typography sx={{ color: "black", fontWeight: "600" }}>
                    Edit
                  </Typography>
                </Button>
              </Box>
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
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              {editedMessage === index && focus ? (
                <Box>
                  <TextField
                    multiline
                    maxRows={5}
                    variant="standard"
                    InputProps={{
                      disableUnderline: true,
                      spellCheck: false,
                    }}
                    sx={{
                      alignItems: "flex-end",
                      padding: "8px",
                      borderRadius: "5px",
                      textAlign: "left",
                      border: "1px solid rgba(23, 23, 23, 0.08)",
                      backgroundColor: "rgba(163, 157, 146, 0.5)",
                    }}
                    value={editedMessageContent}
                    onChange={(e) => setEditedMessageContent(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key == "Escape" || e.key == "Esc") {
                        handleEditSave(index);
                        console.log(message.content);
                        console.log(editedMessageContent);
                      }
                      if (e.key === "Enter") {
                        editMessageMutation.mutate({
                          content: editedMessageContent,
                          messageId: message.id,
                          conversationId: selectedUserConversation!.id,
                        });
                        handleEditSave(index);
                      }
                    }}
                  />
                  <Typography sx={{ fontSize: "10px" }}>
                    esc to <span style={{ color: "blue" }}>return</span> or
                    enter to <span style={{ color: "blue" }}>save</span>
                  </Typography>
                </Box>
              ) : (
                <Box>
                  {message.content && (
                    <>
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
                      {message.edited && (
                        <Typography sx={{ fontSize: "9px" }}>
                          (edited)
                        </Typography>
                      )}
                    </>
                  )}
                </Box>
              )}
            </Box>

            <Typography ref={messagesEndRef}></Typography>
          </Box>
        </ListItem>
      ))}
    </List>
  );
};
