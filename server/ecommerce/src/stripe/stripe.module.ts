import { Module } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { NodemailerService } from 'src/nodemailer/nodemailer.service';
import { UsersService } from 'src/users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Follow } from 'src/utils/entities/followers.entity';
import { User } from 'src/utils/entities/user.entity';
import { Profile } from 'src/utils/entities/profile.entity';
import { Avatar } from 'src/utils/entities/avatar.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Follow, User, Profile, Avatar])],
  providers: [StripeService, NodemailerService, UsersService],
  exports: [StripeService],
})
export class StripeModule {}
