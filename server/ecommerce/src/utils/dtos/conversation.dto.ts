import { z } from 'zod';

export const EditMessageSchema = z.object({
  content: z.string(),
  conversationId: z.number(),
  messageId: z.number(),
});

export type EditMessageDto = z.infer<typeof EditMessageSchema>;
