import {
  Avatar,
  Box,
  Card,
  CardActionArea,
  CardContent,
  Divider,
  Typography,
} from "@mui/material";
import { UserWithAvatar } from "../../types/types";
import { AccountCircle } from "@mui/icons-material";
import { RenderAvatar } from "../RenderAvatar";

type Props = {
  filteredUsers: UserWithAvatar[];
  setSearchInputValue: React.Dispatch<React.SetStateAction<string>>;
  setChosenUserId: React.Dispatch<React.SetStateAction<number | null>>;
  setIsSearchedIconClicked: React.Dispatch<React.SetStateAction<boolean>>;
};

export const DisplayFilteredUsers = ({
  filteredUsers,
  setSearchInputValue,
  setChosenUserId,
  setIsSearchedIconClicked,
}: Props) => {
  return (
    <Card
      sx={{
        width: "100%",
        height: "281px",
        boxShadow: "none",
        overflowY: "auto",
      }}
    >
      {filteredUsers.map((user, index) => (
        <CardActionArea
          onClick={() => {
            setSearchInputValue(user.username);
            setChosenUserId(user.id);

            setIsSearchedIconClicked(false);
          }}
        >
          <CardContent key={index} sx={{ display: "flex" }}>
            <Box sx={{ display: "flex", gap: "10px" }}>
              <RenderAvatar width="36px" height="36px" user={user} />
              <Typography>{user.username}</Typography>
            </Box>
          </CardContent>
          <Divider />
        </CardActionArea>
      ))}
    </Card>
  );
};
