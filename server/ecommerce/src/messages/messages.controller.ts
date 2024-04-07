import {
  Body,
  Controller,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { AuthUser } from 'src/decorators/user.decorator';
import { NewMessageDto, NewMessageDtoSchema } from 'src/utils/dtos/message.dto';
import { ZodValidationPipe } from 'src/utils/pipes/ZodValidationPipe';
import { MessagesService } from './messages.service';
import { ConversationsService } from 'src/conversations/conversations.service';

@Controller('messages')
export class MessagesController {
  constructor(
    private readonly messagesService: MessagesService,
    private readonly conversationsService: ConversationsService,
  ) {}
  @Post()
  async createMessage() {
    return;
  }

  @Post('new')
  @UseGuards(AuthGuard)
  @UsePipes(new ZodValidationPipe(NewMessageDtoSchema))
  async createMessageAndNewConversation(
    @Query('receiverId', ParseIntPipe) receiverId: number,
    @Body() dto: NewMessageDto,
    @AuthUser() authUser: AuthUser,
  ) {
    const { conversation, isNew } =
      await this.conversationsService.createNewConversation(
        receiverId,
        authUser,
      );
    return await this.messagesService.createFirstMessage(
      { conversation: conversation, isNew: isNew },
      dto.content,
      authUser,
    );
  }
}
