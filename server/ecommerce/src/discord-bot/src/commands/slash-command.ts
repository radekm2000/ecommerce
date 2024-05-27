import {
  AutocompleteInteraction,
  ChatInputCommandInteraction,
  SlashCommandBuilder,
} from 'discord.js';

export interface SlashCommand {
  readonly config: Omit<
    SlashCommandBuilder,
    'addSubcommand' | 'addSubcommandGroup'
  >;

  execute(interaction: ChatInputCommandInteraction): Promise<void>;
  autocomplete(interaction: AutocompleteInteraction): Promise<void>;
}
