import { Module, forwardRef } from '@nestjs/common';
import { DiscordBotController } from './discord-bot.controller';
import { DiscordBotService } from './discord-bot.service';
import { UsersService } from 'src/users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Follow } from 'src/utils/entities/followers.entity';
import { User } from 'src/utils/entities/user.entity';
import { Profile } from 'src/utils/entities/profile.entity';
import { Avatar } from 'src/utils/entities/avatar.entity';
import { ProductsService } from 'src/products/products.service';
import { Image } from 'src/utils/entities/image.entity';
import { Product } from 'src/utils/entities/product.entity';
import { ProductNotificationService } from 'src/product-notification/product-notification.service';
import { ProductNotification } from 'src/utils/entities/product-notification.entity';
import { FollowersService } from 'src/followers/followers.service';
import { ItemNotifierService } from './src/commands/notifiers/item-notifier.service';
import { DiscordNotificationsService } from 'src/discord-notifications/discord-notifications.service';
import { IProductsService } from 'src/spi/products';
import { DiscordGuildModule } from 'src/discord-guild/discord-guild.module';
import { DiscordGuildService } from 'src/discord-guild/discord-guild.service';

@Module({
  controllers: [DiscordBotController],
  providers: [
    DiscordBotService,
    UsersService,
    { provide: IProductsService, useClass: ProductsService },
    ProductNotificationService,
    FollowersService,
    ItemNotifierService,
    DiscordNotificationsService,
  ],

  imports: [
    TypeOrmModule.forFeature([
      Follow,
      User,
      Profile,
      Avatar,
      Image,
      Product,
      ProductNotification,
    ]),
  ],
  exports: [DiscordBotService],
})
export class DiscordBotModule {}
