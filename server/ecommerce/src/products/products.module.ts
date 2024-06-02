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
import { ProductNotificationService } from 'src/product-notification/product-notification.service';
import { ProductNotification } from 'src/utils/entities/product-notification.entity';
import { StripeService } from 'src/stripe/stripe.service';
import { NodemailerService } from 'src/nodemailer/nodemailer.service';
import { DiscordNotificationsService } from 'src/discord-notifications/discord-notifications.service';
import { ItemNotifierService } from 'src/discord-bot/src/commands/notifiers/item-notifier.service';
import { IProductsService } from 'src/spi/products';

@Module({
  controllers: [ProductsController],
  providers: [
    { provide: IProductsService, useClass: ProductsService },
    UsersService,

    ProductNotificationService,
    StripeService,
    NodemailerService,
    ItemNotifierService,
    DiscordNotificationsService,
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
    FollowersModule,
  ],
  exports: [IProductsService],
})
export class ProductsModule {}
