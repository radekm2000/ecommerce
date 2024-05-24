import {
  ChatInputCommandInteraction,
  EmbedBuilder,
  SlashCommandBuilder,
} from 'discord.js';
import { SlashCommand } from './slash-command';
import { UsersService } from 'src/users/users.service';
import { Review } from 'src/utils/entities/review.entity';
import { DiscordEmbedColors } from '../discord-embeds/colors';

type Config = {
  usersService: UsersService;
};

export class ReviewsCommand implements SlashCommand {
  private readonly usersService: UsersService;

  public readonly config = new SlashCommandBuilder()
    .setName('reviews')
    .setDescription('Displays reviews that are listed on your  profile');

  constructor(config: Config) {
    this.usersService = config.usersService;
  }

  public execute = async (interaction: ChatInputCommandInteraction) => {
    const userId = interaction.user.id;
    const userAvatar = interaction.user.avatarURL();

    await interaction.deferReply({ ephemeral: true });

    const user = await this.usersService.getUserWithReviews(userId);

    const totalReviews = this.calculateTotalReviews(user.reviews);
    const averageRating = this.calculateAverageReviewsRating(user.reviews);

    if (totalReviews === 0) {
      await interaction.editReply('You have no reviews yet');
    }

    const embed = await this.createEmbed(
      totalReviews,
      averageRating,
      user.reviews,
      userAvatar,
    );

    await interaction.editReply({ embeds: [embed] });
  };

  private createEmbed = async (
    totalReviews: number,
    averageRating: number,
    reviews: Review[],
    userAvatar: string,
  ) => {
    const embed = new EmbedBuilder()
      .setTitle(
        `You have a total of ${totalReviews} reviews with an average rating of ⭐ ${averageRating.toFixed(
          2,
        )}`,
      )
      .setColor(DiscordEmbedColors.default)
      .setThumbnail(userAvatar);

    reviews.forEach((review) => {
      embed.addFields([
        {
          name: 'Reviewer',
          value: review.reviewCreator.username,
          inline: true,
        },
        {
          name: 'Rating',
          value: `⭐ ${review.rating.toString()}`,
          inline: true,
        },
        { name: 'Comment', value: review.comment },
      ]);
    });

    return embed;
  };

  private calculateTotalReviews = (reviews: Review[]) => {
    return reviews.length;
  };

  private calculateAverageReviewsRating = (reviews: Review[]): number => {
    if (reviews.length === 0) {
      return 0;
    }

    const ratings = reviews.map((review) => review.rating);
    const sortedRatings = ratings.sort((a, b) => a - b);

    const middleIndex = Math.floor(sortedRatings.length / 2);

    if (sortedRatings.length % 2 === 0) {
      return (sortedRatings[middleIndex - 1] + sortedRatings[middleIndex]) / 2;
    } else {
      return sortedRatings[middleIndex];
    }
  };
}
