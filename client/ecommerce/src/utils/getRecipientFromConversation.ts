import { Conversation } from "../types/types";

export const getRecipientFromConversation = (
  conversation: Conversation,
  myUsername: string
) => {
  console.log("konfa do sprawdzenia");
  console.log(conversation);
  console.log(myUsername);
  if (!conversation.creator || !conversation.recipient) {
    return;
  }
  return conversation.creator.username === myUsername
    ? conversation.recipient
    : conversation.creator;
};
