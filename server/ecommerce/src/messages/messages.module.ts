import { Module } from '@nestjs/common';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';
import { ConversationsService } from 'src/conversations/conversations.service';
import { ConversationsModule } from 'src/conversations/conversations.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Conversation } from 'src/utils/entities/conversation.entity';
import { Message } from 'src/utils/entities/message.entity';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/utils/entities/user.entity';
import { Follow } from 'src/utils/entities/followers.entity';
import { Profile } from 'src/utils/entities/profile.entity';
import { Avatar } from 'src/utils/entities/avatar.entity';

@Module({
  controllers: [MessagesController],
  providers: [MessagesService, ConversationsService, UsersService],
  imports: [
    ConversationsModule,
    TypeOrmModule.forFeature([
      Conversation,
      Message,
      User,
      Follow,
      Profile,
      Avatar,
    ]),
  ],
})
export class MessagesModule {}
