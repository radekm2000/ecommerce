import { Module } from '@nestjs/common';
import { ProductNotificationController } from './product-notification.controller';
import { ProductNotificationService } from './product-notification.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductNotification } from 'src/utils/entities/product-notification.entity';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/utils/entities/user.entity';
import { Follow } from 'src/utils/entities/followers.entity';
import { Profile } from 'src/utils/entities/profile.entity';
import { Avatar } from 'src/utils/entities/avatar.entity';
import { ProductsService } from 'src/products/products.service';
import { Product } from 'src/utils/entities/product.entity';
import { Image } from 'src/utils/entities/image.entity';
import { ItemNotifier } from 'src/discord-bot/src/commands/notifiers/item-notifier';
import { ItemNotifierService } from 'src/discord-bot/src/commands/notifiers/item-notifier.service';
import { DiscordNotificationsService } from 'src/discord-notifications/discord-notifications.service';
import { IProductsService } from 'src/spi/products';
import { DiscordGuildService } from 'src/discord-guild/discord-guild.service';
import { DiscordGuildModule } from 'src/discord-guild/discord-guild.module';
import { IDiscordGuildService } from 'src/spi/discord-guild';
import { DiscordBotService } from 'src/discord-bot/discord-bot.service';
import { FollowersService } from 'src/followers/followers.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProductNotification,
      User,
      Follow,
      Profile,
      Avatar,
      Product,
      Image,
    ]),
  ],
  controllers: [ProductNotificationController],
  providers: [
    ProductNotificationService,
    UsersService,
    { provide: IProductsService, useClass: ProductsService },
    ItemNotifierService,
    DiscordNotificationsService,
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
  exports: [ProductNotificationService],
})
export class ProductNotificationModule {}
