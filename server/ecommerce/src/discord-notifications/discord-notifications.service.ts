import { Injectable, OnModuleInit } from '@nestjs/common';
import { DiscordNotificationsBot } from './discord-notifications-bot';
import { Client, IntentsBitField } from 'discord.js';

@Injectable()
export class DiscordNotificationsService implements OnModuleInit {
  public discordNotificationsBot: DiscordNotificationsBot;
  private readonly bot: Client;
  private readonly botToken: string;
  private readonly botApplicationId: string;

  constructor() {
    this.botToken = process.env.DISCORD_BOT_TOKEN2;
    this.botApplicationId = process.env.DISCORD_CLIENT_ID2;
    this.bot = new Client({
      intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMessages,
      ],
      allowedMentions: {
        parse: ['everyone', 'roles', 'users'],
      },
    });

    this.discordNotificationsBot = new DiscordNotificationsBot({
      commands: [],
      bot: this.bot,
      botToken: this.botToken,
      botApplicationId: this.botApplicationId,
    });
  }

  async onModuleInit() {
    await this.discordNotificationsBot.start();
  }
}
