import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from 'src/utils/entities/review.entity';
import { ReviewsController } from './reviews.controller';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/utils/entities/user.entity';
import { Follow } from 'src/utils/entities/followers.entity';
import { Profile } from 'src/utils/entities/profile.entity';
import { Avatar } from 'src/utils/entities/avatar.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Review, User, Follow, Profile, Avatar])],
  providers: [ReviewsService, UsersService],
  controllers: [ReviewsController],
})
export class ReviewsModule {}
