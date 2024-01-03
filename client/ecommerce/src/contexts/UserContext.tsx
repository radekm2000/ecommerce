import { User } from "../types/types";
import { ReactNode, createContext, useContext, useState } from "react";
const defaultState: UserContext = {
  user: {
    email: "",
    id: 0,
    role: "user",
    username: "",
    avatar: "",
    googleId: "",
    products: [],
  },
  setUser: (user: User) => {},
} as UserContext;

export type UserContext = {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
};

export const UserContext = createContext<UserContext>(defaultState);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>(defaultState.user);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("User context not found");
  }
  return context;
};
