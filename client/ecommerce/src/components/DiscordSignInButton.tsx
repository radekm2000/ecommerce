import { Box, BoxProps, Link, Typography } from "@mui/material";
import { DiscordIcon } from "./DiscordIcon";

export const DiscordSignInButton = (props: BoxProps) => {
  const baseURL = import.meta.env.VITE_BASE_URL;
  return (
    <Box {...props}>
      <Link
        href={`${baseURL}/auth/discord/login`}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "start",
          borderRadius: "6px",
          padding: "6px 16px",
          background: "#5771c9",
          textDecoration: "none",
          "&:hover": {
            background: "#5771c9ee",
            textDecoration: "none",
          },
        }}
      >
        <DiscordIcon
          sx={{ color: "#fff", marginRight: "10px", height: "40px" }}
        />
        <Typography sx={{ fontSize: "14px", fontWeight: 400, color: "#fff" }}>
          SIGN IN
        </Typography>
      </Link>
    </Box>
  );
};
