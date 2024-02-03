import { Module } from '@nestjs/common';
import { FollowersController } from './followers.controller';
import { FollowersService } from './followers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Follow } from 'src/utils/entities/followers.entity';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/utils/entities/user.entity';
import { Profile } from 'src/utils/entities/profile.entity';
import { Avatar } from 'src/utils/entities/avatar.entity';

@Module({
  controllers: [FollowersController],
  providers: [FollowersService, UsersService],
  imports: [TypeOrmModule.forFeature([Follow, User, Profile, Avatar])],
})
export class FollowersModule {}
