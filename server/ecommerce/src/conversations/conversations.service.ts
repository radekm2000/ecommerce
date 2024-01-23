import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthUser } from 'src/decorators/user.decorator';
import { Conversation } from 'src/utils/entities/conversation.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ConversationsService {
  constructor(
    @InjectRepository(Conversation)
    private conversationRepository: Repository<Conversation>,
  ) {}
  async createNewConversation(receiverId: number, authUser: AuthUser) {
    const conversation = this.conversationRepository.create({
      recipient: {
        id: receiverId,
      },
      creator: {
        id: authUser.sub,
      },
    });
    return this.conversationRepository.save(conversation);
  }

  async getAllConversations() {
    const conversations = await this.conversationRepository.find({
      relations: [
        'messages',
        'lastMessageSent',
        'messages.author',
        'recipient',
        'creator',
      ],
    });

    return conversations;
  }
}
