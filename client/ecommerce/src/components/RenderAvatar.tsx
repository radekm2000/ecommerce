import { AccountCircle } from "@mui/icons-material";
import { User } from "../types/types";
import { DiscordAvatar } from "./DiscordAvatar";

type Props = {
  user: User;
  width: string;
  height: string;
  marginLeft?: string;
  marginRight?: string;
};

export const RenderAvatar = ({ user, height, width, marginLeft, marginRight }: Props) => {
  if (user.role === "discordUser" && user.avatar) {
    return <DiscordAvatar userId={user.discordId} avatar={user.avatar} width={width} height={height} marginRight={marginRight} />;
  } else if (user.avatar) {
    return (
      <img
        src={user.avatar}
        alt="Avatar"
        style={{
          height: height,
          width: width,
          borderRadius: "50%",
          marginLeft,
          marginRight
        }}
      />
    );
  } else {
    return (
      <AccountCircle
        sx={{
          height: height,
          width: width,
          color: "grey",
          marginRight,
          marginLeft
        }}
      />
    );
  }
};
