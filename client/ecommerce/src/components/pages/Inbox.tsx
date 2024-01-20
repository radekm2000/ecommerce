import { Box, Button, Container, Typography } from "@mui/material";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import AddCommentOutlinedIcon from "@mui/icons-material/AddCommentOutlined";
import { InboxSidebar } from "../InboxSidebar";
import { InboxChatNavbar } from "../InboxChatNavbar";
import { InboxChatContent } from "../InboxChatContent";
import { useParams } from "wouter";
import { InboxChatInput } from "../InboxChatInput";
export const Inbox = () => {
  const params = useParams();
  const userId = params?.userId;
  const below1200 = useMediaQuery(1200);
  const below960 = useMediaQuery(960);
  const below1600 = useMediaQuery(1600);
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
            <InboxSidebar />
          </Box>
        )}
        <Box sx={{ flex: "1 0 auto" }}>
          {userId && (
            <>
              <InboxChatNavbar />
              <Box sx={{ maxHeight: "335px", overflowY: "scroll" }}>
                <InboxChatContent />
              </Box>
              <InboxChatInput />
            </>
          )}
        </Box>
      </Box>
      <Box sx={{ width: below1200 ? "none" : "25%" }}></Box>
    </Container>
  );
};
