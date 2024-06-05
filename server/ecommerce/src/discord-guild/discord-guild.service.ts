import {
  Inject,
  Injectable,
  Logger,
  OnApplicationBootstrap,
} from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { Client, EmbedBuilder, MessageCreateOptions } from 'discord.js';
import 'dotenv/config';
import { DiscordBotService } from 'src/discord-bot/discord-bot.service';
import { DiscordEvents } from 'src/events/constants/events';
import { UsersService } from 'src/users/users.service';

export type AssignDiscordRoleEvent = {
  userId: number;
  discordRoleId: string;
};

@Injectable()
export class DiscordGuildService {
  private readonly botClient: Client;
  private readonly guildId: string;
  private readonly logger: Logger;

  constructor(
    @Inject(UsersService) private usersService: UsersService,
    @Inject(DiscordBotService) private discordBotService: DiscordBotService,
  ) {
    this.botClient = this.discordBotService.bot;
    this.logger = new Logger(DiscordGuildService.name);
    this.guildId = process.env.GUILD_ID ?? '';
  }

  @OnEvent(DiscordEvents.AssignDiscordRole)
  public async handleAssignDiscordRoleEvent(payload: AssignDiscordRoleEvent) {
    const user = await this.getUser(payload.userId);
    if (!user.discordId) {
      return;
    }

    if (user.products.length < 1) {
      return;
    }
    return this.assignRoles(user.discordId, payload.discordRoleId);
  }

  public assignRoles = async (userId: string, roleId: string) => {
    if (!roleId) {
      return;
    }

    const member = await this.getGuildMember(userId);
    try {
      if (member && !(await this.hasRole(userId, roleId))) {
        await member.roles.add(roleId);

        this.logger.log(`User ${userId} has been granted a new role`);
        this.sendMessageToMember(member.id, {
          embeds: [
            new EmbedBuilder().setDescription(
              `You have been granted a new role !`,
            ),
          ],
        });
      } else {
        this.logger.log(`User ${userId} has this role already`);
      }
    } catch (error) {
      console.log(error);
      this.logger.error(
        `Error while trying to assign roles for user ${userId}`,
      );
    }
  };

  public removeRoles = async (userId: string, roleId: string) => {
    if (!roleId) {
      return;
    }

    const member = await this.getGuildMember(userId);
    try {
      if (member && (await this.hasRole(userId, roleId))) {
        await member.roles.remove(roleId);
        this.logger.log(`User ${userId} has lost a role ${roleId}`);
        this.sendMessageToMember(member.id, {
          embeds: [new EmbedBuilder().setDescription(`You have lost a role !`)],
        });
      }
    } catch (error) {
      this.logger.error(`Error while trying to remove role for user ${userId}`);
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
