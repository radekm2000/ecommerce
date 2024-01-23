import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthUser } from 'src/decorators/user.decorator';
import { UsersService } from 'src/users/users.service';
import { Conversation } from 'src/utils/entities/conversation.entity';
import { Message } from 'src/utils/entities/message.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message) private messageRepository: Repository<Message>,
    @InjectRepository(Conversation)
    private conversationRepository: Repository<Conversation>,
    private usersService: UsersService,
  ) {}
  async createFirstMessage(
    { conversation, isNew }: { conversation: Conversation; isNew: boolean },
    content: string,
    sender: AuthUser,
  ) {
    if (isNew) {
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
      return { conversation: updatedConversation, isNew };
    }
    const meUser = await this.usersService.findUserById(sender.sub);
    const newMessage = this.messageRepository.create({
      content: content,
      conversation: conversation,
      author: meUser,
    });
    const timeNow = new Date();
    await this.messageRepository.save(newMessage);
    const updatedConversation = {
      ...conversation,
      lastMessageSent: newMessage,
      lastMessageSentAt: timeNow,
    } as Conversation;

    await this.conversationRepository.save(updatedConversation);
    return { conversation: updatedConversation, isNew };
  }
}
