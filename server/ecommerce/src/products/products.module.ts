import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Image } from 'src/utils/entities/image.entity';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/utils/entities/user.entity';
import { Product } from 'src/utils/entities/product.entity';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, UsersService],
  imports: [TypeOrmModule.forFeature([Image, User, Product])],
})
export class ProductsModule {}
