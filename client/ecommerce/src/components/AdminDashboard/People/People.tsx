import { Box, Card, CardContent, CardMedia } from "@mui/material";
import { useFetchUsers } from "../../../hooks/useFetchUsers";
import { FallbackProgress } from "../../../utils/FallbackProgress";
import { PeopleList } from "./PeopleList";

export const People = () => {
  const { data: users, isLoading } = useFetchUsers();

  if (isLoading) {
    return <FallbackProgress />;
  }

  return (
    <Card
      sx={{
        width: "100%",
        height: "90%",
        boxShadow: "none",
        overflowY:'scroll',
    '&::-webkit-scrollbar':{
        width:0,
    }
      }}
    >
      <CardContent>{users && <PeopleList users={users} />}</CardContent>
    </Card>
  );
};
