import { Box, Input } from "@mui/material";
import { useState } from "react";

export const InboxChatInput = () => {
  const [message, setMessage] = useState<string>("");
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };
  return (
    <Box sx={{ padding: "16px 8px", height: "auto", borderTop: "1px solid rgba(23, 23, 23, 0.08)" }}>
      <Input
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
