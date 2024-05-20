import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client, IntentsBitField } from 'discord.js';
import { DiscordBot } from './src/discordbot';
import 'dotenv/config';
import { Ping } from './src/commands/ping';

const config1 = new Ping();
@Injectable()
export class DiscordBotService implements OnModuleInit {
  private readonly discordBot: DiscordBot;
  private readonly bot: Client;
  private readonly botToken: string;
  private readonly botApplicationId: string;

  constructor() {
    this.botToken = process.env.DISCORD_BOT_TOKEN;
    this.botApplicationId = process.env.DISCORD_CLIENT_ID;
    this.bot = new Client({
      intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMessages,
      ],
      allowedMentions: {
        parse: ['everyone', 'roles', 'users'],
      },
    });

    this.discordBot = new DiscordBot({
      bot: this.bot,
      botToken: this.botToken,
      botApplicationId: this.botApplicationId,
      commands: [config1],
    });
  }

  async onModuleInit() {
    await this.discordBot.start();
  }
}
