import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Conversation } from 'src/utils/entities/conversation.entity';
import { Message } from 'src/utils/entities/message.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message) private messageRepository: Repository<Message>,
    @InjectRepository(Conversation)
    private conversationRepository: Repository<Conversation>,
  ) {}
  async createFirstMessage(conversation: Conversation, content: string) {
    const newMessage = this.messageRepository.create({
      author: conversation.creator,
      content: content,
      conversation: conversation,
    });
    const timeNow = new Date();
    await this.messageRepository.save(newMessage);
    const updatedConversation = {
      ...conversation,
      lastMessageSent: newMessage,
      lastMessageSentAt: timeNow,
    } as Conversation;

    await this.conversationRepository.save(updatedConversation);
    return updatedConversation;
  }
}
