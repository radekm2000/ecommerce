import { MessageCreateOptions } from 'discord.js';

export const IDiscordGuildService = Symbol('DiscordGuildService');

export interface IDiscordGuildService {
  assignRoles(userId: string, roleIds: string[]): Promise<void>;
  sendMessageToMember(
    userId: string,
    message: MessageCreateOptions,
  ): Promise<void>;
}
