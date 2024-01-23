import { Conversation } from "../types/types";

export const getTheLatestConversation = (conversations: Conversation[]) => {
  if (!conversations || conversations.length === 0) {
    return null;
  } else if (conversations.length === 1) {
    return conversations[0];
  }
  conversations.sort(
    (a, b) =>
      new Date(b.lastMessageSentAt).valueOf() -
      new Date(a.lastMessageSentAt).valueOf()
  );
  return conversations[0];
};
