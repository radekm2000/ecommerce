import { Module } from '@nestjs/common';
import { DiscordGuildService } from './discord-guild.service';
import { DiscordBotService } from 'src/discord-bot/discord-bot.service';
import { UsersService } from 'src/users/users.service';
import { IProductsService } from 'src/spi/products';
import { ProductsService } from 'src/products/products.service';
import { FollowersService } from 'src/followers/followers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Follow } from 'src/utils/entities/followers.entity';
import { User } from 'src/utils/entities/user.entity';
import { Profile } from 'src/utils/entities/profile.entity';
import { Avatar } from 'src/utils/entities/avatar.entity';
import { Image } from 'src/utils/entities/image.entity';
import { ProductNotification } from 'src/utils/entities/product-notification.entity';
import { Product } from 'src/utils/entities/product.entity';
import { ProductNotificationService } from 'src/product-notification/product-notification.service';
import { ItemNotifierService } from 'src/discord-bot/src/commands/notifiers/item-notifier.service';
import { DiscordNotificationsService } from 'src/discord-notifications/discord-notifications.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Follow,
      User,
      Profile,
      Avatar,
      Image,
      ProductNotification,
      Product,
    ]),
  ],
  providers: [
    UsersService,
    ProductNotificationService,
    ItemNotifierService,
    DiscordNotificationsService,
    {
      provide: IProductsService,
      useClass: ProductsService,
    },
    {
      provide: DiscordGuildService,
      useFactory: (botService: DiscordBotService, usersService: UsersService) =>
        new DiscordGuildService({
          botClient: botService.bot,
          usersService: usersService,
        }),
      inject: [DiscordBotService, UsersService],
    },
    DiscordBotService,

    FollowersService,
  ],
  exports: [DiscordGuildService],
})
export class DiscordGuildModule {}
