import { Box, Divider } from "@mui/material";
import { UserWithAvatar } from "../../../types/types";
import { PersonCard } from "./PersonCard";
import { useDisplayPplWithoutMe } from "../../../utils/DisplayPplWithoutMe";

type Props = {
  users: UserWithAvatar[];
};

export const PeopleList = ({ users }: Props) => {
  const filteredUsers = useDisplayPplWithoutMe(users);
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      {filteredUsers.map((user) => (
        <>
          <PersonCard user={user} />
          <Divider />
        </>
      ))}
    </Box>
  );
};
