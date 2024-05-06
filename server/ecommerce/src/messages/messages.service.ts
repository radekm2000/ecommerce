import {
  PutObjectCommand,
  PutObjectCommandInput,
  S3Client,
} from '@aws-sdk/client-s3';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomUUID } from 'crypto';
import { AuthUser } from 'src/decorators/user.decorator';
import { UsersService } from 'src/users/users.service';
import { Conversation } from 'src/utils/entities/conversation.entity';
import { Message } from 'src/utils/entities/message.entity';
import { Repository } from 'typeorm';

const s3 = new S3Client({
  region: process.env.BUCKET_REGION,
  credentials: {
    accessKeyId: process.env.BUCKET_ACCESS_KEY,
    secretAccessKey: process.env.BUCKET_SECRET_ACCESS_KEY,
  },
});

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
    await this.messageRepository.save(newMessage);
    const updatedConversation = {
      ...conversation,
      lastMessageSent: newMessage,
    } as Conversation;

    await this.conversationRepository.save(updatedConversation);
    return { conversation: updatedConversation, isNew };
  }

  async uploadImage(
    userId: number,
    file: Express.Multer.File,
    conversation: Conversation,
  ) {
    const buffer = file.buffer;
    const messageImageName = `${randomUUID()}${file.originalname}`;

    const meUser = await this.usersService.findUserById(userId);
    const newMessageImage = this.messageRepository.create({
      content: '',
      conversation: conversation,
      author: meUser,
      imageName: messageImageName,
    });

    await this.messageRepository.save(newMessageImage);

    const updatedConversation = {
      ...conversation,
      lastMessageSent: newMessageImage,
    } as Conversation;
    await this.conversationRepository.save(updatedConversation);
    const paramsToS3 = {
      Bucket: process.env.BUCKET_NAME,
      Key: messageImageName,
      Body: buffer,
      ContentType: file.mimetype,
    } as PutObjectCommandInput;

    const command = new PutObjectCommand(paramsToS3);

    try {
      await s3.send(command);
    } catch (error) {
      return 'Failed uploading image to s3 bucket';
    }

    return updatedConversation;
  }

  async deleteMessage(
    messageId: number,
    userId: number,
    conversation: Conversation,
  ) {
    const message = await this.messageRepository.findOne({
      where: { id: messageId },
      relations: ['author'],
    });

    if (!message) {
      throw new HttpException('Message not found', HttpStatus.NOT_FOUND);
    }

    if (message.author.id !== userId) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
    const conversationWithMessages = await this.conversationRepository.findOne({
      where: { id: conversation.id },
      relations: ['messages', 'creator', 'recipient', 'lastMessageSent'],
    });

    //checks if the last message is being deleted

    const updatedConversation = {
      ...conversation,
      lastMessageSent:
        conversationWithMessages.messages.length > 0 &&
        messageId ===
          conversationWithMessages.messages[
            conversationWithMessages.messages.length - 1
          ].id
          ? (conversationWithMessages.lastMessageSent =
              conversationWithMessages.messages[
                conversationWithMessages.messages.length - 2
              ])
          : conversationWithMessages.lastMessageSent,
    } as Conversation;

    await this.messageRepository.delete({ id: messageId });
    await this.conversationRepository.save(updatedConversation);
    return messageId;
  }

  async saveMessage(message: Message) {
    return await this.messageRepository.update(
      {
        id: message.id,
      },
      {
        content: message.content,
        edited: true,
      },
    );
  }
}
