import {
  ChatInputCommandInteraction,
  EmbedBuilder,
  SlashCommandBuilder,
} from 'discord.js';
import { SlashCommand } from './slash-command';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/utils/entities/user.entity';
import { DiscordEmbedColors } from '../discord-embeds/colors';

type Config = {
  userService: UsersService;
};

export class ProfileCommand implements SlashCommand {
  public readonly config = new SlashCommandBuilder()
    .setName('profile')
    .setDescription('Shows informations about your profile');

  private readonly userService: UsersService;

  constructor(config: Config) {
    this.userService = config.userService;
  }

  public execute = async (interaction: ChatInputCommandInteraction) => {
    const userAvatar = interaction.user.avatarURL();
    const displayName = interaction.user.displayName;
    const userId = interaction.user.id;

    await interaction.deferReply({ ephemeral: true });

    const embed = await this.createEmbed(userAvatar, displayName);

    await interaction.editReply({ embeds: [embed] });
  };

  private createEmbed = async (
    userAvatar: string | null,
    displayName: string,
  ) => {
    return new EmbedBuilder()
      .setTitle('Your profile')
      .setColor(DiscordEmbedColors.default)
      .setAuthor({ name: displayName })
      .setThumbnail(userAvatar);
  };
}
