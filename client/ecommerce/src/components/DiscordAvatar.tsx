import { Avatar } from "@mui/material";

type Props = {
  userId: string | undefined;
  avatar: string;
};

export const DiscordAvatar = ({ userId, avatar }: Props) => {
  const avatarUrl = `https://cdn.discordapp.com/avatars/${userId}/${avatar}.png`;
  console.log(avatarUrl);
  return (
    <Avatar
      src={avatarUrl}
      sx={{ width: "192px", height: "192px", borderRadius: "50%", marginRight: '20px' }}
    />
  );
};
