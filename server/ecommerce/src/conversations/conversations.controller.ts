import {
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ConversationsService } from './conversations.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { AuthUser } from 'src/decorators/user.decorator';

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
}
