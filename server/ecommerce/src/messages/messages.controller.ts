import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Param,
  ParseFilePipe,
  ParseIntPipe,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { AuthUser } from 'src/decorators/user.decorator';
import { NewMessageDto, NewMessageDtoSchema } from 'src/utils/dtos/message.dto';
import { ZodValidationPipe } from 'src/utils/pipes/ZodValidationPipe';
import { MessagesService } from './messages.service';
import { ConversationsService } from 'src/conversations/conversations.service';
import { FileInterceptor } from '@nestjs/platform-express';

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
      await this.conversationsService.createNewConversationOrReturnExistingOne(
        receiverId,
        authUser,
      );
    return await this.messagesService.createFirstMessage(
      { conversation: conversation, isNew: isNew },
      dto.content,
      authUser,
    );
  }

  @Post('image')
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async uploadImageFromChatInput(
    @Query('receiverId', ParseIntPipe) receiverId: number,
    @UploadedFile() file: Express.Multer.File,

    @AuthUser() authUser: AuthUser,
  ) {
    const { conversation } =
      await this.conversationsService.createNewConversationOrReturnExistingOne(
        receiverId,
        authUser,
      );
    return await this.messagesService.uploadImage(
      authUser.sub,
      file,
      conversation,
    );
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async deleteMessage(
    @Query('receiverId', ParseIntPipe) receiverId: number,
    @Param('id', ParseIntPipe) messageId: number,
    @AuthUser() authUser: AuthUser,
  ) {
    const { conversation } =
      await this.conversationsService.createNewConversationOrReturnExistingOne(
        receiverId,
        authUser,
      );
    return await this.messagesService.deleteMessage(
      messageId,
      authUser.sub,
      conversation,
    );
  }
}
