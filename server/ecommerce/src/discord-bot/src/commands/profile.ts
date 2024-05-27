import {
  AutocompleteInteraction,
  ChatInputCommandInteraction,
  EmbedBuilder,
  SlashCommandBuilder,
} from 'discord.js';
import { SlashCommand } from './slash-command';
import { UsersService } from 'src/users/users.service';
import { DiscordEmbedColors } from '../discord-embeds/colors';
import { CommandRef } from './constants';

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
    const user = await this.getUser(userId);
    const amountOfProducts = user.products.length ?? 0;
    const amountOfReviews = user.reviews.length ?? 0;

    await interaction.deferReply({ ephemeral: true });

    const embed = await this.createEmbed(
      userAvatar,
      displayName,
      amountOfProducts,
      amountOfReviews,
    );

    await interaction.editReply({ embeds: [embed] });
  };

  public autocomplete = async (interaction: AutocompleteInteraction) => {};

  private createEmbed = async (
    userAvatar: string | null,
    displayName: string,
    amountOfProducts: number,
    amountOfReviews: number,
  ) => {
    return new EmbedBuilder()
      .setTitle('Your profile')
      .setColor(DiscordEmbedColors.default)
      .setAuthor({ name: displayName })
      .setThumbnail(userAvatar)
      .setDescription(`You currently have:  `)
      .addFields([
        {
          name: 'Reviews',
          value: `⭐ ${amountOfReviews}`,
          inline: true,
        },
        {
          name: 'Products',
          value: `${amountOfProducts}`,
          inline: true,
        },
        {
          name: '**Useful Commands**',
          value: `
            • Use **${CommandRef.reviews}** to check your reviews in detail.
            • Use **${CommandRef.inventory}** to view your listed products
          `,
          inline: false,
        },
      ]);
  };

  private getUser = async (discordId: string) => {
    return await this.userService.findUserByDiscordId(discordId);
  };
}
