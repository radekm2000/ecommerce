import { z } from 'zod';

export const DiscordProfileSchema = z.object({
  id: z.string(),
  username: z.string(),
  avatar: z.string().nullish(),
});

export type DiscordProfile = z.infer<typeof DiscordProfileSchema>;

export type DiscordTokens = {
  accessToken: string;
  refreshToken: string;
};
