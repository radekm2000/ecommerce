import { Module } from '@nestjs/common';
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
import { NodemailerService } from 'src/nodemailer/nodemailer.service';

@Module({
  controllers: [ProductsController],
  providers: [
    ProductsService,
    UsersService,
    ProductNotificationService,
    NodemailerService,
  ],
  imports: [
    TypeOrmModule.forFeature([
      Image,
      User,
      Product,
      Follow,
      Profile,
      Avatar,
      ProductNotification,
    ]),
    FollowersModule,
  ],
  exports: [ProductsService],
})
export class ProductsModule {}
