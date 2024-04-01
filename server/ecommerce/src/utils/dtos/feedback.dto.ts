import { z } from 'zod';

export const FeedbackDtoSchema = z.object({
  featureType: z.union([
    z.literal('other'),
    z.literal('bug'),
    z.literal('enhancement'),
    z.literal('new feature'),
  ]),
  email: z.string().email(),
  contactName: z.string().min(1, 'Contact name is required'),
  description: z.string().min(1, 'Description is required'),
});

export type FeedbackDto = z.infer<typeof FeedbackDtoSchema>;
