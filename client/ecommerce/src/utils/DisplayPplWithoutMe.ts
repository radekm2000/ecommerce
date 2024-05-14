import { useUserContext } from "../contexts/UserContext";
import { UserWithAvatar } from "../types/types";

export const useDisplayPplWithoutMe = (users: UserWithAvatar[]) => {
  const { user } = useUserContext();

  return users.filter((u) => u.id !== user.id);
};
