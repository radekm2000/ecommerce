import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthUser } from 'src/decorators/user.decorator';
import { Conversation } from 'src/utils/entities/conversation.entity';
import { Repository } from 'typeorm';

const s3 = new S3Client({
  region: process.env.BUCKET_REGION,
  credentials: {
    accessKeyId: process.env.BUCKET_ACCESS_KEY,
    secretAccessKey: process.env.BUCKET_SECRET_ACCESS_KEY,
  },
});

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

  async getAllConversations(authUserId: number) {
    const conversations = await this.conversationRepository.find({
      relations: [
        'messages',
        'lastMessageSent',
        'messages.author',
        'recipient',
        'creator',
      ],
      where: [
        { creator: { id: authUserId } },
        { recipient: { id: authUserId } },
      ],
    });

    return conversations;
  }

  async getUserConversations(userId: number, authUser: AuthUser) {
    const conversation = await this.conversationRepository.findOne({
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
    for (const message of conversation.messages) {
      if (message.content === '' && message.imageName) {
        const getObjectParams = {
          Bucket: process.env.BUCKET_NAME,
          Key: message.imageName,
        };
        const command = new GetObjectCommand(getObjectParams);
        const url = await getSignedUrl(s3, command, { expiresIn: 3600 });

        message.imageUrl = url;
      }
    }
    return conversation;
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
