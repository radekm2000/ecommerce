import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/utils/entities/user.entity';
import { Follow } from 'src/utils/entities/followers.entity';
import { FollowersService } from 'src/followers/followers.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Follow])],
  controllers: [UsersController],
  providers: [UsersService, FollowersService],
})
export class UsersModule {}
