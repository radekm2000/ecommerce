import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
    const existingConversation = await this.conversationRepository.findOne({
      where: [
        {
          creator: { id: authUser.sub },
          recipient: { id: receiverId },
        },
        {
          creator: { id: receiverId },
          recipient: { id: authUser.sub },
        },
      ],

      relations: ['creator', 'recipient', 'lastMessageSent'],
    });
    if (existingConversation) {
      return { conversation: existingConversation, isNew: false };
    }
    const conversation = this.conversationRepository.create({
      recipient: {
        id: receiverId,
      },
      creator: {
        id: authUser.sub,
      },
    });
    const newConversation =
      await this.conversationRepository.save(conversation);
    return { conversation: newConversation, isNew: true };
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

  async getUserConversations(userId: number, authUser: AuthUser) {
    return await this.conversationRepository.findOne({
      where: [
        {
          creator: { id: userId },
          recipient: { id: authUser.sub },
        },
        {
          creator: { id: authUser.sub },
          recipient: { id: userId },
        },
      ],

      relations: [
        'messages',
        'lastMessageSent',
        'messages.author',
        'recipient',
        'creator',
      ],
    });
  }

  async deleteConversation(conversationId: number) {
    const conversation = await this.conversationRepository.findOne({
      where: {
        id: conversationId,
      },
    });
    if (!conversation) {
      throw new HttpException(
        'Conversation doesnt exist',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    return await this.conversationRepository.remove(conversation);
  }
}
