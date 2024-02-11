import { Module } from '@nestjs/common';
import { ConversationsController } from './conversations.controller';
import { ConversationsService } from './conversations.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Conversation } from 'src/utils/entities/conversation.entity';

@Module({
  controllers: [ConversationsController],
  providers: [ConversationsService],
  imports: [TypeOrmModule.forFeature([Conversation])],
  exports: [ConversationsService],
})
export class ConversationsModule {}
