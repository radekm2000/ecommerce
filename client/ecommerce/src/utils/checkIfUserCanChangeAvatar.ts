import { User } from "../types/types";

export const isAbleToChangeAvatar = (user: User) => {
  return user.googleId === null || user.role !== "discordUser";
};
