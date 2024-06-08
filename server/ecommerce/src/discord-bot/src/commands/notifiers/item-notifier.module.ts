import { Module, forwardRef } from '@nestjs/common';
import { ItemNotifierService } from './item-notifier.service';
import { UsersService } from 'src/users/users.service';
import { DiscordNotificationsService } from 'src/discord-notifications/discord-notifications.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Follow } from 'src/utils/entities/followers.entity';
import { User } from 'discord.js';
import { Profile } from 'src/utils/entities/profile.entity';
import { Avatar } from 'src/utils/entities/avatar.entity';
import { Product } from 'src/utils/entities/product.entity';
import { ProductNotification } from 'src/utils/entities/product-notification.entity';
import { DiscordNotificationsModule } from 'src/discord-notifications/discord-notifications.module';
import { ProductsModule } from 'src/products/products.module';
import { ItemNotifier } from './item-notifier';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Follow,
      User,
      Profile,
      Avatar,
      Product,
      ProductNotification,
    ]),
    DiscordNotificationsModule,
    forwardRef(() => ProductsModule),
    UsersModule,
  ],
  providers: [ItemNotifierService, ItemNotifier],
  exports: [ItemNotifierService],
})
export class ItemNotifierModule {}
