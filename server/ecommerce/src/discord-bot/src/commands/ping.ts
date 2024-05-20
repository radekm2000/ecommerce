import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import { SlashCommand } from './slash-command';

export class Ping implements SlashCommand {
  public readonly config = new SlashCommandBuilder()
    .setName('ping')
    .setDescription('responses to ping');

  public constructor() {}

  public execute = async (interaction: ChatInputCommandInteraction) => {
    await interaction.reply('pong');
  };
}
