import { ReactNode, createContext, useContext, useState } from "react";
import { FetchedNotifications } from "../types/types";

const defaultState = {
  notifications: [],
  setNotifications: (notifications: FetchedNotifications[]) => [],
} as NotificationsChatContext;

export type NotificationsChatContext = {
  notifications: FetchedNotifications[];
  setNotifications: React.Dispatch<
    React.SetStateAction<FetchedNotifications[]>
  >;
};

export const ChatNotificationsContext =
  createContext<NotificationsChatContext>(defaultState);

export const ChatNotificationsProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [notifications, setNotifications] = useState<FetchedNotifications[]>(
    []
  );
  return (
    <ChatNotificationsContext.Provider
      value={{ notifications, setNotifications }}
    >
      {children}
    </ChatNotificationsContext.Provider>
  );
};

export const useNotificationsContext = () => {
  const context = useContext(ChatNotificationsContext);
  if (context === undefined) {
    throw new Error(
      "useNotificationsContext hook must be used within ChatNotificationsContext "
    );
  }
  return context;
};
