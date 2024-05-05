import { Avatar } from "@mui/material";

type Props = {
  userId: string | undefined;
  avatar: string;
  width: string;
  height: string;
  marginRight?: string
};

export const DiscordAvatar = ({ userId, avatar, width, height, marginRight }: Props) => {
  const avatarUrl = `https://cdn.discordapp.com/avatars/${userId}/${avatar}.png`;
  return (
    <Avatar
      src={avatarUrl}
      sx={{
        width: width,
        height: height,
        borderRadius: "50%",
        marginRight: marginRight
      }}
    />
  );
};
