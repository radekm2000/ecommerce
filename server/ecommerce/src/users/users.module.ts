import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/utils/entities/user.entity';
import { Follow } from 'src/utils/entities/followers.entity';
import { FollowersService } from 'src/followers/followers.service';
import { Profile } from 'src/utils/entities/profile.entity';
import { Avatar } from 'src/utils/entities/avatar.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Follow, Profile, Avatar])],
  controllers: [UsersController],
  providers: [UsersService, FollowersService],
})
export class UsersModule {}
