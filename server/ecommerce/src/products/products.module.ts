import { Module, forwardRef } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Image } from 'src/utils/entities/image.entity';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/utils/entities/user.entity';
import { Product } from 'src/utils/entities/product.entity';
import { Follow } from 'src/utils/entities/followers.entity';
import { FollowersModule } from 'src/followers/followers.module';
import { Profile } from 'src/utils/entities/profile.entity';
import { Avatar } from 'src/utils/entities/avatar.entity';
import { ProductNotification } from 'src/utils/entities/product-notification.entity';
import { StripeService } from 'src/stripe/stripe.service';
import { NodemailerService } from 'src/nodemailer/nodemailer.service';
import { DiscordNotificationsService } from 'src/discord-notifications/discord-notifications.service';
import { ItemNotifierService } from 'src/discord-bot/src/commands/notifiers/item-notifier.service';
import { IProductsService } from 'src/spi/products';
import { DiscordNotificationsModule } from 'src/discord-notifications/discord-notifications.module';
import { ProductNotificationModule } from 'src/product-notification/product-notification.module';

@Module({
  controllers: [ProductsController],
  providers: [
    { provide: IProductsService, useClass: ProductsService },
    UsersService,

    StripeService,
    NodemailerService,
  ],
  imports: [
    TypeOrmModule.forFeature([
      Product,
      Image,
      User,
      Follow,
      Profile,
      Avatar,
      ProductNotification,
    ]),
    ProductNotificationModule,
    FollowersModule,
    DiscordNotificationsModule,
  ],
  exports: [IProductsService],
})
export class ProductsModule {}
