import { Module } from '@nestjs/common';
import { ConversationsController } from './conversations.controller';
import { ConversationsService } from './conversations.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Conversation } from 'src/utils/entities/conversation.entity';
import { MessagesService } from 'src/messages/messages.service';
import { Message } from 'src/utils/entities/message.entity';
import { UsersService } from 'src/users/users.service';
import { Follow } from 'src/utils/entities/followers.entity';
import { User } from 'src/utils/entities/user.entity';
import { Profile } from 'src/utils/entities/profile.entity';
import { Avatar } from 'src/utils/entities/avatar.entity';

@Module({
  controllers: [ConversationsController],
  providers: [ConversationsService, MessagesService, UsersService],
  imports: [
    TypeOrmModule.forFeature([
      Conversation,
      Message,
      Follow,
      User,
      Profile,
      Avatar,
    ]),
  ],
  exports: [ConversationsService],
})
export class ConversationsModule {}
