import { Logger } from '@nestjs/common';
import {
  ChatInputCommandInteraction,
  Client,
  Events,
  REST,
  Routes,
} from 'discord.js';
import 'dotenv/config';
import { SlashCommand } from './commands/slash-command';

type Config = {
  bot: Client;
  botToken: string;
  botApplicationId: string;
  commands: SlashCommand[];
};

export class DiscordBot {
  private readonly botToken: string;
  private readonly bot: Client;
  private readonly botApplicationId: string;
  private readonly logger: Logger;
  private readonly commands = new Map<string, SlashCommand>();

  public constructor(config: Config) {
    this.bot = config.bot;
    this.botApplicationId = config.botApplicationId;
    this.botToken = config.botToken;
    this.logger = new Logger(DiscordBot.name);
    config.commands.forEach((c) => this.commands.set(c.config.name, c));
  }

  public start = async () => {
    await this.bot.login(this.botToken);
    this.bot.on('ready', this.onReady);
  };

  private onReady = async () => {
    await this.registerCommands();
    this.listenToInteractions();
    this.logger.log('Discord bot has been started');
  };

  public stop = async () => {
    await this.bot.destroy();
    this.logger.log('Discord bot has been stopped');
  };

  private registerCommands = async () => {
    const rest = new REST().setToken(this.botToken);
    const url = Routes.applicationCommands(this.botApplicationId);
    await rest.put(url, {
      body: Array.from(this.commands.values()).map((c) => c.config.toJSON()),
    });
  };

  private handleCommand = async (interaction: ChatInputCommandInteraction) => {
    const command = this.commands.get(interaction.commandName);
    if (!command) return;

    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(error);
      const msg = 'There was an error while executing this command!';
      if (interaction.replied || interaction.deferred) {
        this.logger.error(
          `Error when executing ${interaction.commandName} command`,
        );
        await interaction.followUp({
          content: msg,
          ephemeral: true,
        });
      } else {
        this.logger.error(
          `Error when executing ${interaction.commandName} command`,
        );
        await interaction.reply({
          content: msg,
          ephemeral: true,
        });
      }
    }
  };

  private listenToInteractions = () => {
    this.bot.on(Events.InteractionCreate, async (interaction) => {
      if (!interaction.isChatInputCommand()) return;

      await this.handleCommand(interaction);
    });
  };
}
