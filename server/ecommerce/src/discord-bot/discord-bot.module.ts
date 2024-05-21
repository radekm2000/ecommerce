import { Module } from '@nestjs/common';
import { DiscordBotController } from './discord-bot.controller';
import { DiscordBotService } from './discord-bot.service';
import { UsersService } from 'src/users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Follow } from 'src/utils/entities/followers.entity';
import { User } from 'src/utils/entities/user.entity';
import { Profile } from 'src/utils/entities/profile.entity';
import { Avatar } from 'src/utils/entities/avatar.entity';

@Module({
  controllers: [DiscordBotController],
  providers: [DiscordBotService, UsersService],
  imports: [TypeOrmModule.forFeature([Follow, User, Profile, Avatar])],
})
export class DiscordBotModule {}
