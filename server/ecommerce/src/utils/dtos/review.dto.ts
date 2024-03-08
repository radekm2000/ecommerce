import { z } from 'zod';
export const ReviewDtoSchema = z.object({
  comment: z.string(),
  rating: z.number().refine((value) => value >= 0 && value <= 5, {
    message: 'Rating must be between 0 and 5',
  }),
  reviewRecipientId: z.number(),
});

export type ReviewDto = z.infer<typeof ReviewDtoSchema>;
