import { HttpException } from '@nestjs/common';
import { ConversationsService } from 'src/conversations/conversations.service';
import { AuthUser } from 'src/decorators/user.decorator';
import { Conversation } from 'src/utils/entities/conversation.entity';
import { Message } from 'src/utils/entities/message.entity';
import { User } from 'src/utils/entities/user.entity';

describe('conversations service CREATE NEW CONVERSATION', () => {
  let conversationRepositoryMock: any;
  beforeEach(() => {
    conversationRepositoryMock = {};
  });
  it('should return existing conversation with isNew boolean set to false', async () => {
    const existingConversation: Conversation = {
      creator: 'user' as unknown as User,
      id: 1,
      lastMessageSent: 'msg' as unknown as Message,
      lastMessageSentAt: new Date(Date.now()),
      messages: [],
      recipient: 'user2' as unknown as User,
    };

    conversationRepositoryMock = {
      findOne: jest.fn().mockReturnValue(existingConversation),
    };

    const conversationsService = new ConversationsService(
      conversationRepositoryMock,
    );

    const result = await conversationsService.createNewConversationOrReturnExistingOne(
      1,
      {} as AuthUser,
    );

    expect(result).toEqual({
      conversation: existingConversation,
      isNew: false,
    });
  });
  it('should return existing conversation with isNew boolean set to true', async () => {
    const newConversation = {
      recipient: 'recipient' as unknown as User,
      creator: 'creator' as unknown as User,
    };

    conversationRepositoryMock = {
      findOne: jest.fn().mockResolvedValue(null),
      create: jest.fn(),
      save: jest.fn().mockResolvedValue(newConversation),
    };

    const conversationsService = new ConversationsService(
      conversationRepositoryMock,
    );

    const result = await conversationsService.createNewConversationOrReturnExistingOne(
      1,
      {} as AuthUser,
    );

    expect(result).toEqual({
      conversation: newConversation,
      isNew: true,
    });
  });
});

describe('conversations service DELETE CONVERSATION', () => {
  let conversationRepositoryMock: any;
  beforeEach(() => {
    conversationRepositoryMock = {};
  });
  it('should throw error when conversation to remove doesnt exist', async () => {
    const RANDOM_CONVERSATION_ID = 19;
    const conversation = {
      id: 2,
    } as unknown as Conversation;

    conversationRepositoryMock = {
      findOne: jest.fn().mockResolvedValue(null),
    };

    const conversationsService = new ConversationsService(
      conversationRepositoryMock,
    );

    try {
      await conversationsService.deleteConversation(RANDOM_CONVERSATION_ID);
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
      expect(error.response).toEqual('Conversation doesnt exist');
    }
  });
  it('should remove conversation', async () => {
    const CONVERSATION_ID = 2;
    const conversation = {
      id: 2,
    } as unknown as Conversation;

    conversationRepositoryMock = {
      findOne: jest.fn().mockResolvedValue(conversation),
      remove: jest.fn().mockResolvedValue(conversation),
    };

    const conversationsService = new ConversationsService(
      conversationRepositoryMock,
    );

    const result =
      await conversationsService.deleteConversation(CONVERSATION_ID);

    expect(conversationRepositoryMock.remove).toHaveBeenCalled();
    expect(conversationRepositoryMock.remove).toHaveBeenCalledWith(
      conversation,
    );

    expect(result).toEqual(conversation);
  });
});
