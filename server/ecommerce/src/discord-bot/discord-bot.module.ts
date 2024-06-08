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
import { DiscordNotificationsService } from 'src/discord-notifications/discord-notifications.service';
import { IProductsService } from 'src/spi/products';
import { DiscordGuildModule } from 'src/discord-guild/discord-guild.module';
import { DiscordGuildService } from 'src/discord-guild/discord-guild.service';
import { DiscordNotificationsModule } from 'src/discord-notifications/discord-notifications.module';
import { ProductsModule } from 'src/products/products.module';
import { ItemNotifierModule } from './src/commands/notifiers/item-notifier.module';
import { ProductNotificationModule } from 'src/product-notification/product-notification.module';

@Module({
  controllers: [DiscordBotController],
  providers: [
    DiscordBotService,
    UsersService,
    { provide: IProductsService, useClass: ProductsService },
    FollowersService,
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
    ProductsModule,
    ItemNotifierModule,
    DiscordNotificationsModule,
    ProductNotificationModule,
  ],
  exports: [DiscordBotService],
})
export class DiscordBotModule {}
