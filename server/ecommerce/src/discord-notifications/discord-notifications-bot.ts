import { Injectable, Logger } from '@nestjs/common';
import {
  AutocompleteInteraction,
  ChatInputCommandInteraction,
  Client,
  Events,
  MessageCreateOptions,
  REST,
  Routes,
} from 'discord.js';
import { SlashCommand } from 'src/discord-bot/src/commands/slash-command';
import { InteractionError } from 'src/discord-bot/src/errors/interactionError';

type Config = {
  bot: Client;
  botToken: string;
  commands: SlashCommand[];
  botApplicationId: string;
};

@Injectable()
export class DiscordNotificationsBot {
  private readonly logger: Logger;
  private readonly bot: Client;
  private readonly botToken: string;
  private readonly botApplicationId: string;
  private readonly commands = new Map<string, SlashCommand>();

  constructor(config: Config) {
    this.logger = new Logger(DiscordNotificationsBot.name);
    this.bot = config.bot;
    this.botToken = config.botToken;
    this.botApplicationId = config.botApplicationId;
    config.commands.forEach((c) => this.commands.set(c.config.name, c));
  }

  public start = async () => {
    await this.bot.login(this.botToken);
    this.bot.on('ready', this.onReady);
  };

  private onReady = async () => {
    await this.registerCommands();
    this.listenToInteractions();
    this.logger.log('DiscordNotificationsBot has been started');
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
      const isInteractionError = error instanceof InteractionError;
      const msg = isInteractionError
        ? error.message
        : 'There was an error while executing this command!';

      if (!isInteractionError) {
        this.logger.error(
          `Error when executing ${interaction.commandName} command`,
        );
      }
      if (interaction.replied || interaction.deferred) {
        this.logger.error(
          `Error when executing ${interaction.commandName} command`,
        );
        await interaction.followUp({
          content: msg,
          ephemeral: true,
        });
      } else {
        await interaction.reply({
          content: msg,
          ephemeral: true,
        });
      }
    }
  };

  private listenToInteractions = () => {
    this.bot.on(Events.InteractionCreate, async (interaction) => {
      if (interaction.isChatInputCommand()) {
        await this.handleCommand(interaction);
      } else if (interaction.isAutocomplete()) {
        await this.handleAutocomplete(interaction);
      }
    });
  };

  private handleAutocomplete = async (interaction: AutocompleteInteraction) => {
    const command = this.commands.get(interaction.commandName);
    if (!command) return;

    try {
      await command.autocomplete(interaction);
    } catch (error) {
      this.logger.error(
        { error },
        `Error when executing the ${interaction.commandName} autocomplete`,
      );
    }
  };

  public sendDM = async (
    userDiscordId: string,
    message: MessageCreateOptions,
  ) => {
    try {
      await this.bot.users.send(userDiscordId, message);
    } catch (error) {}
  };
}
