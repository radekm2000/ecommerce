import { Product } from 'src/utils/entities/product.entity';
import { UsersService } from 'src/users/users.service';
import { Follow } from 'src/utils/entities/followers.entity';
import { Profile } from 'src/utils/entities/profile.entity';
import { UserRole } from 'src/utils/dtos/types';
import { Avatar } from 'src/utils/entities/avatar.entity';
import { Message } from 'src/utils/entities/message.entity';
import { Review } from 'src/utils/entities/review.entity';
import { EmbedBuilder } from 'discord.js';
import { Inject, Injectable } from '@nestjs/common';
import { DiscordNotificationsBot } from 'src/discord-notifications/discord-notifications-bot';
import { IProductsService } from 'src/spi/products';
import { ProductsService } from 'src/products/products.service';
import { DiscordNotificationsService } from 'src/discord-notifications/discord-notifications.service';

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
  bot: DiscordNotificationsBot;
  productsService: IProductsService;
  usersService: UsersService;
};

@Injectable()
export class ItemNotifier {
  constructor(
    @Inject(UsersService) private usersService: UsersService,
    @Inject(IProductsService) private productsService: IProductsService,
    @Inject(DiscordNotificationsService)
    private discordNotificationService: DiscordNotificationsService,
  ) {}

  public notifyUsers = async (product: Product) => {
    const existingProductWithImage = await this.productsService.findProduct(
      product.id,
    );
    const user = await this.usersService.getUserInfo(product.user.id);
    const usersToNotify = await this.getUsersToNotify(user);

    await this.notify(usersToNotify, existingProductWithImage);
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
        this.discordNotificationService.sendDM(user.discordId, {
          embeds: [
            new EmbedBuilder()
              .setTitle(`**${productAuthor}** has listed a new item`)
              .setDescription(product.description)
              .addFields([
                { name: 'Price', value: `$${product.price}`, inline: true },
                { name: 'Brand', value: product.brand, inline: true },
                { name: 'Category', value: product.category, inline: true },
              ])
              .setColor('#58b9ff')
              .setImage(productImage),
          ],
        }),
      ),
    );
  };
}
