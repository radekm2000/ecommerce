import { Product } from 'src/utils/entities/product.entity';
import { DiscordBot } from '../../discordbot';
import { UsersService } from 'src/users/users.service';
import { Follow } from 'src/utils/entities/followers.entity';
import { Profile } from 'src/utils/entities/profile.entity';
import { UserRole } from 'src/utils/dtos/types';
import { Avatar } from 'src/utils/entities/avatar.entity';
import { Message } from 'src/utils/entities/message.entity';
import { Review } from 'src/utils/entities/review.entity';
import { EmbedBuilder } from 'discord.js';
import { DiscordBotService } from 'src/discord-bot/discord-bot.service';
import { Injectable } from '@nestjs/common';

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
  discordBotService: DiscordBotService;
  usersService: UsersService;
};

@Injectable()
export class ItemNotifier {
  private readonly discordBotService: DiscordBotService;
  private readonly usersService: UsersService;

  constructor(config: Config) {
    this.discordBotService = config.discordBotService;
    this.usersService = config.usersService;
  }

  public notifyUsers = async (userId: number, product: Product) => {
    const user = await this.usersService.getUserInfo(userId);
    const usersToNotify = await this.getUsersToNotify(user);

    await this.notify(usersToNotify, product);
  };

  private getUsersToNotify = async (user: User) => {
    const users = user.followings.map((follow) => follow.follower);
    const filteredUsers = users.filter((user) => !!user.discordId);

    return filteredUsers;
  };

  private notify = async (usersToNotify: User[], product: Product) => {
    const productImage = product.images[0].imageUrl;
    const productAuthor = product.user.username;
    await Promise.all(
      usersToNotify.map((user) =>
        this.discordBotService.discordBot.sendDM(user.discordId, {
          embeds: [
            new EmbedBuilder()
              .setTitle(`**${productAuthor}** has listed a new item`)
              .addFields([
                { name: 'Price', value: `$${product.price}`, inline: true },
                { name: 'Brand', value: product.brand, inline: true },
                { name: 'Category', value: product.category, inline: true },
              ])
              .setAuthor({ name: productAuthor })
              .setColor('#58b9ff')
              .setImage(productImage),
          ],
        }),
      ),
    );
  };
}
