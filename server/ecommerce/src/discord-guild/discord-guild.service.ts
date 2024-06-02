import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { Client, MessageCreateOptions } from 'discord.js';
import 'dotenv/config';
import { UsersService } from 'src/users/users.service';

type AssignDiscordRoleEvent = {
  userId: number;
  VENDOR_ROLE_ID: string;
};

type Config = {
  botClient: Client;
  usersService: UsersService;
};

@Injectable()
export class DiscordGuildService {
  private readonly botClient: Client;
  private readonly guildId: string;
  private readonly logger: Logger;
  private readonly usersService: UsersService;

  constructor(config: Config) {
    this.usersService = config.usersService;
    this.botClient = config.botClient;
    this.logger = new Logger(DiscordGuildService.name);
    this.guildId = process.env.GUILD_ID ?? '';
  }

  @OnEvent('assignDiscordRole', { async: true })
  public async handleAssignDiscordRoleEvent(payload: AssignDiscordRoleEvent) {
    const user = await this.getUser(payload.userId);
    if (!user.discordId) {
      return;
    }

    if (user.products.length < 1) {
      return;
    }
    return this.assignRoles(user.discordId, payload.VENDOR_ROLE_ID);
  }

  public assignRoles = async (userId: string, roleId: string) => {
    if (!roleId) {
      return;
    }

    const member = await this.getGuildMember(userId);
    try {
      if (member && !(await this.hasRole(userId, roleId)))
        await member.roles.add(roleId);
      this.logger.log(`User ${userId} has been granted a new role`);
    } catch (error) {
      console.log(error);
      this.logger.error(
        `Error while trying to assign roles for user ${userId}`,
      );
    }
  };

  private checkUserRoles = async (userId: string, roleId: string) => {
    const member = await this.getGuildMember(userId);
    if (member.roles.cache.some((role) => role.id === roleId)) {
      console.log('user has that role');
    } else {
      console.log('user doesnt have that role');
    }
  };

  private getUser = async (userId: number) => {
    const user = await this.usersService.findUserById(userId);
    return user;
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
