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
import { ProductNotification } from 'src/utils/entities/product-notification.entity';
import { FollowersService } from 'src/followers/followers.service';
import { IProductsService } from 'src/spi/products';
import { DiscordNotificationsModule } from 'src/discord-notifications/discord-notifications.module';
import { ProductsModule } from 'src/products/products.module';
import { ItemNotifierModule } from './src/commands/notifiers/item-notifier.module';
import { ProductNotificationModule } from 'src/product-notification/product-notification.module';
import { BinanceModule } from 'src/binance/binance.module';

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
    BinanceModule,
  ],
  exports: [DiscordBotService],
})
export class DiscordBotModule {}
