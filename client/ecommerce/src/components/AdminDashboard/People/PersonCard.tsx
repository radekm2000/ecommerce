import { Box, Button, Card, CardMedia, Typography } from "@mui/material";
import { UserWithAvatar } from "../../../types/types";
import { RenderAvatar } from "../../RenderAvatar";
import { useDisplayPplWithoutMe } from "../../../utils/DisplayPplWithoutMe";

type Props = {
  user: UserWithAvatar;
};

export const PersonCard = ({ user }: Props) => {
  return (
    <Box>
      <Box sx={{ display: "flex", gap: "10px", justifyContent: 'center', alignItems: 'center' }}>
        <RenderAvatar user={user} height="48px" width="48px" />
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography>{user.username}</Typography>
          <Typography sx={{ fontSize: "11px", color: "grey" }}>
            {user.role}
          </Typography>
        </Box>

        <Box sx={{ marginLeft: "auto" }}>
          <Button sx={{ textTransform: "none", color: '#007782' }}>Edit</Button>
        </Box>
      </Box>
    </Box>
  );
};
