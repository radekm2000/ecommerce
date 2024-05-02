import { HttpException } from '@nestjs/common';
import { MessagesService } from 'src/messages/messages.service';
import { Conversation } from 'src/utils/entities/conversation.entity';
import { Message } from 'src/utils/entities/message.entity';

describe('deleteMessage method', () => {
  let messageRepository = {} as any;
  let conversationRepository = {} as any;
  let usersService = {} as any;
  it('should throw error when MESSAGE IS NOT FOUND', async () => {
    messageRepository = {
      findOne: jest.fn().mockResolvedValue(null),
    };

    const messageId = 1;
    const userId = 11;
    const messageService = new MessagesService(
      messageRepository,
      conversationRepository,
      usersService,
    );

    try {
      const result = await messageService.deleteMessage(
        messageId,
        userId,
        {} as Conversation,
      );
      console.log(result);
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
      expect(error.message).toEqual('Message not found');
    }
  });
  it('should throw error when TRYING TO DELETE A MESSAGE WHICH DOESNT BELONG TO USER', async () => {
    const messageMock: Message = {
      author: {
        id: 10,
      } as any,
      content: 'testmsg',
      conversation: null,
      id: 1,
      imageName: '',
      imageUrl: '',
    };

    messageRepository = {
      findOne: jest.fn().mockResolvedValue(messageMock),
    };

    const messageId = 1;
    const userId = 11;
    const messageService = new MessagesService(
      messageRepository,
      conversationRepository,
      usersService,
    );

    try {
      const result = await messageService.deleteMessage(
        messageId,
        userId,
        {} as Conversation,
      );
      console.log(result);
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
      expect(error.message).toEqual('Forbidden');
    }
  });
  it('should delete message', async () => {
    const messageMock1: Message = {
      author: {
        id: 10,
      } as any,
      content: 'testmsg1',
      conversation: null,
      id: 1,
      imageName: '',
      imageUrl: '',
    };
    const messageMock2: Message = {
      author: {
        id: 10,
      } as any,
      content: 'testmsg1',
      conversation: null,
      id: 2,
      imageName: '',
      imageUrl: '',
    };
    const messageMock3: Message = {
      author: {
        id: 10,
      } as any,
      content: 'testmsg1',
      conversation: null,
      id: 3,
      imageName: '',
      imageUrl: '',
    };

    const conversationWithMessages = {
      messages: [messageMock1, messageMock2, messageMock3],
      lastMessageSent: messageMock3,
    };

    conversationRepository = {
      findOne: jest.fn().mockResolvedValue(conversationWithMessages),
      save: jest.fn(),
    };

    messageRepository = {
      findOne: jest.fn().mockResolvedValue(messageMock3),
      delete: jest.fn(),
    };

    const messageId = 1;
    const userId = 10;
    const messageService = new MessagesService(
      messageRepository,
      conversationRepository,
      usersService,
    );

    const result = await messageService.deleteMessage(
      messageId,
      userId,
      {} as any,
    );
    expect(result).toEqual(messageId);
  });
  it('should correctly set lastMessageSent IF LAST MESSAGE  is being deleted', async () => {
    const messageMock1: Message = {
      author: {
        id: 10,
      } as any,
      content: 'testmsg1',
      conversation: null,
      id: 1,
      imageName: '',
      imageUrl: '',
    };
    const messageMock2: Message = {
      author: {
        id: 10,
      } as any,
      content: 'testmsg1',
      conversation: null,
      id: 2,
      imageName: '',
      imageUrl: '',
    };
    const messageMock3: Message = {
      author: {
        id: 10,
      } as any,
      content: 'testmsg1',
      conversation: null,
      id: 3,
      imageName: '',
      imageUrl: '',
    };

    const messageId = 3;

    const conversationWithMessages = {
      messages: [messageMock1, messageMock2, messageMock3],
      lastMessageSent: messageMock3,
    };
    const updatedConversation = {
      ...conversationWithMessages,
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
    };

    expect(updatedConversation.lastMessageSent).toEqual(messageMock2);
  });
  it('shouldnt change  lastMessageSent if NOT LAST message  is being deleted', async () => {
    const messageMock1: Message = {
      author: {
        id: 10,
      } as any,
      content: 'testmsg1',
      conversation: null,
      id: 1,
      imageName: '',
      imageUrl: '',
    };
    const messageMock2: Message = {
      author: {
        id: 10,
      } as any,
      content: 'testmsg1',
      conversation: null,
      id: 2,
      imageName: '',
      imageUrl: '',
    };
    const messageMock3: Message = {
      author: {
        id: 10,
      } as any,
      content: 'testmsg1',
      conversation: null,
      id: 3,
      imageName: '',
      imageUrl: '',
    };

    const messageId = 1;

    const conversationWithMessages = {
      messages: [messageMock1, messageMock2, messageMock3],
      lastMessageSent: messageMock3,
    };
    const updatedConversation = {
      ...conversationWithMessages,
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
    };

    expect(updatedConversation.lastMessageSent).toEqual(messageMock3);
  });
});
