import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { ConversationsService } from './conversations.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { AuthUser } from 'src/decorators/user.decorator';
import { ZodValidationPipe } from 'src/utils/pipes/ZodValidationPipe';
import {
  EditMessageDto,
  EditMessageSchema,
} from 'src/utils/dtos/conversation.dto';

@Controller('conversations')
export class ConversationsController {
  constructor(private conversationsService: ConversationsService) {}

  @Get()
  @UseGuards(AuthGuard)
  async getAllConversations(@AuthUser() authUser: AuthUser) {
    return await this.conversationsService.getAllConversations(authUser.sub);
  }

  @Get(`users/:userId`)
  @UseGuards(AuthGuard)
  async getUserConversations(
    @Param('userId', ParseIntPipe) userId: number,
    @AuthUser() authUser: AuthUser,
  ) {
    return await this.conversationsService.getUserConversations(
      userId,
      authUser,
    );
  }

  @Delete(`:id`)
  async deleteConversation(@Param('id', ParseIntPipe) conversationId: number) {
    return await this.conversationsService.deleteConversation(conversationId);
  }

  @Post(`:conversationId/messages/:messageId`)
  @UseGuards(AuthGuard)
  @UsePipes(new ZodValidationPipe(EditMessageSchema))
  async editMessage(
    @AuthUser() authUser: AuthUser,
    @Body() dto: EditMessageDto,
  ) {
    console.log(dto);
    return await this.conversationsService.editMessage(dto, authUser.sub);
  }
}
