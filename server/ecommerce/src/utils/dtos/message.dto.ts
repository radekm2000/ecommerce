import { z } from 'zod';

export const NewMessageDtoSchema = z.object({
  content: z.string(),
});

export type NewMessageDto = z.infer<typeof NewMessageDtoSchema>;
