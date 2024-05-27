import {
  AutocompleteInteraction,
  ChatInputCommandInteraction,
  SlashCommandBuilder,
} from 'discord.js';
import { SlashCommand } from '../slash-command';
import { UsersService } from 'src/users/users.service';
import { Follow } from 'src/utils/entities/followers.entity';
import { Profile } from 'src/utils/entities/profile.entity';
import { UserRole } from 'src/utils/dtos/types';
import { Avatar } from 'src/utils/entities/avatar.entity';
import { Product } from 'src/utils/entities/product.entity';
import { Message } from 'src/utils/entities/message.entity';
import { Review } from 'src/utils/entities/review.entity';

type User = {
  followings: Follow[];
  followers: Follow[];
  id: number;
  username: string;
  googleId: string;
  email: string;
  password: string;
  discordId: string;
  profile: Profile;
  role: UserRole;
  avatar: string;
  avatarEntity: Avatar;
  products: Product[];
  messages: Message[];
  reviews: Review[];
};

type Config = {
  usersService: UsersService;
};

export class TrackedUsersCommand implements SlashCommand {
  readonly config = new SlashCommandBuilder()
    .setName('tracked-users')
    .setDescription('Check tracked users')
    .setDMPermission(true);

  private readonly usersService: UsersService;

  constructor(config: Config) {
    this.usersService = config.usersService;
  }
  public execute = async (interaction: ChatInputCommandInteraction) => {
    const userId = interaction.user.id;

    await interaction.deferReply({ ephemeral: true });

    const user = await this.getUserInfo(userId);
    const trackedUsers = await this.getTrackedUsers(user);

    await interaction.editReply({ content: trackedUsers });
  };
  public autocomplete = async (interaction: AutocompleteInteraction) => {};

  private getUserInfo = async (userId: string) => {
    return await this.usersService.findUserByDiscordId(userId);
  };

  private getTrackedUsers = async (user: User) => {
    return (
      user.followers
        .map((follow) => {
          return follow.following.username;
        })
        .join('\n') || 'None'
    );
  };
}
