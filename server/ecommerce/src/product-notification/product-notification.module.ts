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

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProductNotification,
      User,
      Follow,
      Profile,
      Avatar,
      Product,
    ]),
  ],
  controllers: [ProductNotificationController],
  providers: [ProductNotificationService, UsersService, ProductsService],
})
export class ProductNotificationModule {}
