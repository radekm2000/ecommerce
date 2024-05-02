import AddCommentOutlinedIcon from "@mui/icons-material/AddCommentOutlined";
import { Box, Button, Typography } from "@mui/material";
import { useLocation } from "wouter";

type Props = {
  setIsNewChatClicked: React.Dispatch<React.SetStateAction<boolean>>;
};
export const InboxSidebarNavbar = ({ setIsNewChatClicked }: Props) => {
  const [, setLocation] = useLocation();
  const handleClick = () => {
    setIsNewChatClicked(true);
    setLocation("/inbox/new");
  };
  return (
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
      <Typography sx={{ fontSize: "16px", padding: "8px", fontWeight: "500" }}>
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
  );
};
