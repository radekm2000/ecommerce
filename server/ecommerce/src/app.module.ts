import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from 'ormconfig';
import { ProductsModule } from './products/products.module';
import { ImagesModule } from './images/images.module';

@Module({
  imports: [UsersModule, AuthModule, TypeOrmModule.forRoot(config), ProductsModule, ImagesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
