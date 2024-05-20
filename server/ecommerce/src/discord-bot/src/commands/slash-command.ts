import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';

export interface SlashCommand {
  readonly config: SlashCommandBuilder;
  execute(interaction: ChatInputCommandInteraction): Promise<void>;
}
