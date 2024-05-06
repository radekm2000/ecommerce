import { z } from 'zod';

export const NotificationDtoSchema = z.object({
  isRead: z.boolean(),
  senderId: z.number(),
  receiverId: z.number(),
});

export type NotificationDto = z.infer<typeof NotificationDtoSchema>;

export const NotificationMarkAsReadDtoSchema = z.object({
  senderId: z.number(),
});

export type NotificationMarkAsReadDto = z.infer<
  typeof NotificationMarkAsReadDtoSchema
>;

export const DeleteNotificationDtoSchema = z.object({
  senderId: z.number(),
  receiverId: z.number(),
});

export type DeleteNotificationDto = z.infer<typeof DeleteNotificationDtoSchema>;
