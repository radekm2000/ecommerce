import { Conversation } from "../types/types";

export const getRecipientFromConversation = (
  conversation: Conversation,
  myUsername: string
) => {
  if (!conversation?.creator || !conversation?.recipient) {
    return;
  }
  return conversation.creator.username === myUsername
    ? conversation.recipient
    : conversation.creator;
};
