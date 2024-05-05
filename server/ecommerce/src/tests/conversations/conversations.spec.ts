import { HttpException } from '@nestjs/common';
import { ConversationsService } from 'src/conversations/conversations.service';
import { AuthUser } from 'src/decorators/user.decorator';
import { EditMessageDto } from 'src/utils/dtos/conversation.dto';
import { Conversation } from 'src/utils/entities/conversation.entity';
import { Message } from 'src/utils/entities/message.entity';
import { User } from 'src/utils/entities/user.entity';

describe('conversations service CREATE NEW CONVERSATION', () => {
  let conversationRepositoryMock: any;
  let messagesService: any;
  beforeEach(() => {
    conversationRepositoryMock = {};
    messagesService = {};
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
      messagesService,
    );

    const result =
      await conversationsService.createNewConversationOrReturnExistingOne(
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
      messagesService,
    );

    const result =
      await conversationsService.createNewConversationOrReturnExistingOne(
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
  let messagesService: any;
  beforeEach(() => {
    messagesService = {};
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
      messagesService,
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
      messagesService,
    );

    const result =
      await conversationsService.deleteConversation(CONVERSATION_ID);

    expect(conversationRepositoryMock.remove).toHaveBeenCalled();
    expect(conversationRepositoryMock.remove).toHaveBeenCalledWith(
      conversation,
    );

    expect(result).toEqual(conversation);
  });

  describe('conversations service EDIT message', () => {
    let conversationRepository: any;
    let messageService: any;
    beforeEach(() => {
      messageService = {};
      conversationRepository = {};
    });
    it('should throw error if conversation is not found', async () => {
      const dtoMock: EditMessageDto = {
        content: '',
        conversationId: 1,
        messageId: 2,
      };

      const authUserId = 3;

      conversationRepository = {
        findOne: jest.fn().mockResolvedValue(null),
      };

      const conversationServiceMock = new ConversationsService(
        conversationRepository,
        messageService,
      );

      try {
        await conversationServiceMock.editMessage(dtoMock, authUserId);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.response).toEqual('Conversation not found');
      }
    });
    it('should throw error if user is not author of the message', async () => {
      const dtoMock: EditMessageDto = {
        content: '',
        conversationId: 1,
        messageId: 2,
      };

      const authUserId = 3;
      const conversation = {
        id: 1,
        messages: [
          {
            id: 2,
            content: 'msg id 2',
            author: {
              id: 4,
            },
          },
          {
            id: 3,
            content: 'msg id 3',
            author: {
              id: 50,
            },
          },
          {
            id: 4,
            content: 'msg id 4',
            author: {
              id: 48,
            },
          },
        ],
      };

      conversationRepository = {
        findOne: jest.fn().mockResolvedValue(conversation),
      };

      const conversationServiceMock = new ConversationsService(
        conversationRepository,
        messageService,
      );

      try {
        await conversationServiceMock.editMessage(dtoMock, authUserId);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.response).toEqual(
          'Cant edit message if you are not an author',
        );
      }
    });
    it('should throw error if content of the message is the same as edited', async () => {
      const dtoMock: EditMessageDto = {
        content: 'testcontent',
        conversationId: 1,
        messageId: 2,
      };

      const authUserId = 3;
      const conversation = {
        id: 1,
        messages: [
          {
            id: 2,
            content: 'testcontent',
            author: {
              id: 3,
            },
          },
          {
            id: 3,
            content: 'msg id 3',
            author: {
              id: 50,
            },
          },
          {
            id: 4,
            content: 'msg id 4',
            author: {
              id: 48,
            },
          },
        ],
      };

      conversationRepository = {
        findOne: jest.fn().mockResolvedValue(conversation),
      };

      const conversationServiceMock = new ConversationsService(
        conversationRepository,
        messageService,
      );

      try {
        await conversationServiceMock.editMessage(dtoMock, authUserId);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.response).toEqual('Content must be different');
      }
    });
    it('should edit message', async () => {
      const dtoMock: EditMessageDto = {
        content: 'testcontent',
        conversationId: 1,
        messageId: 2,
      };

      const authUserId = 3;
      const conversation = {
        id: 1,
        messages: [
          {
            id: 2,
            content: 'testcontent123',
            author: {
              id: 3,
            },
            edited: false,
          },
          {
            id: 3,
            content: 'msg id 3',
            author: {
              id: 50,
            },
            edited: false,
          },
          {
            id: 4,
            content: 'msg id 4',
            author: {
              id: 48,
            },
            edited: false,
          },
        ],
      };

      conversationRepository = {
        findOne: jest.fn().mockResolvedValue(conversation),
      };

      const foundMessage = conversation.messages.find(
        (m) => m.id === dtoMock.messageId,
      );

      const updatedMessage = {
        ...foundMessage,
        content: dtoMock.content,
        edited: true,
      };

      messageService = {
        saveMessage: jest.fn().mockResolvedValue(updatedMessage),
      };

      const conversationServiceMock = new ConversationsService(
        conversationRepository,
        messageService,
      );

      const result = await conversationServiceMock.editMessage(
        dtoMock,
        authUserId,
      );

      expect(result).toEqual(updatedMessage);
    });
  });
});
