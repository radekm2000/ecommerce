import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { Client, MessageCreateOptions } from 'discord.js';
import 'dotenv/config';

type Config = {
  botClient: Client;
};

@Injectable()
export class DiscordGuildService {
  private readonly botClient: Client;
  private readonly guildId: string;
  private readonly logger: Logger;

  constructor(config: Config) {
    this.botClient = config.botClient;
    this.logger = new Logger(DiscordGuildService.name);
    this.guildId = process.env.GUILD_ID ?? '';
  }

  public assignRoles = async (userId: string, roleIds: string[]) => {
    if (roleIds.length === 0) {
      return;
    }

    roleIds = roleIds.filter((roleId) => !this.hasRole(userId, roleId));

    const member = await this.getGuildMember(userId);
    try {
      await member.roles.add(roleIds);
    } catch (error) {
      this.logger.error(
        `Error while trying to assign roles for user ${userId}`,
      );
    }
  };

  private hasRole = async (userId: string, roleId: string) => {
    try {
      const member = await this.getGuildMember(userId);

      return !!member && member.roles.cache.some((role) => role.id === roleId);
    } catch (error) {
      this.logger.error(`Error while getting roles for user ${userId}`);
    }
  };

  private getGuildMember = async (userId: string) => {
    const guild = await this.getGuild();

    try {
      return (
        guild.members.cache.get(userId) ?? (await guild.members.fetch(userId))
      );
    } catch (error) {
      this.logger.error('Error when getting guild member');
    }
  };

  private getGuild = async () => {
    try {
      return (
        this.botClient.guilds.cache.get(this.guildId) ??
        (await this.botClient.guilds.fetch(this.guildId))
      );
    } catch (error) {
      this.logger.error(`Error when getting guild ${this.guildId}`);
      return undefined;
    }
  };

  public sendMessageToMember = async (
    userId: string,
    message: MessageCreateOptions,
  ) => {
    try {
      await this.botClient.users.send(userId, message);
    } catch (error) {
      this.logger.error(`Error when trying to send message to ${userId}`);
    }
  };
}
