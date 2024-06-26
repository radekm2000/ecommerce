import { Box, Divider } from "@mui/material";
import { UserWithAvatar } from "../../../types/types";
import { PersonCard } from "./PersonCard";
import { useDisplayPplWithoutMe } from "../../../utils/DisplayPplWithoutMe";
import React from "react";

type Props = {
  users: UserWithAvatar[];
};

export const PeopleList = ({ users }: Props) => {
  const filteredUsers = useDisplayPplWithoutMe(users);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      {filteredUsers.map((user, index) => (
        <React.Fragment key={index}>
          <PersonCard user={user} />
          <Divider />
        </React.Fragment>
      ))}
    </Box>
  );
};
