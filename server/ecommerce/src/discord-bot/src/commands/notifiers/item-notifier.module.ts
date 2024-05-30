import { Module } from '@nestjs/common';
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
  ],
  providers: [ItemNotifierService, UsersService, DiscordNotificationsService],
  exports: [ItemNotifierService],
})
export class ItemNotifierModule {}
