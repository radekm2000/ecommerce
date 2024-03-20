import { z } from 'zod';

export const AdminNotificationDtoSchema = z.object({
  username: z.string(),
  action: z.string().max(100),
});

export type adminNotificationDto = z.infer<typeof AdminNotificationDtoSchema>;
