export const isAdmin = (userRole: "admin" | "user" | 'discordUser') => {
  return userRole === "admin";
};
