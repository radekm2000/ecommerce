import { Module } from '@nestjs/common';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';
import { ConversationsService } from 'src/conversations/conversations.service';
import { ConversationsModule } from 'src/conversations/conversations.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Conversation } from 'src/utils/entities/conversation.entity';
import { Message } from 'src/utils/entities/message.entity';

@Module({
  controllers: [MessagesController],
  providers: [MessagesService, ConversationsService],
  imports: [
    ConversationsModule,
    TypeOrmModule.forFeature([Conversation, Message]),
  ],
})
export class MessagesModule {}
