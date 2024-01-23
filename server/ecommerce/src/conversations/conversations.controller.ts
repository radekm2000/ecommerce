import { Controller, Get } from '@nestjs/common';
import { ConversationsService } from './conversations.service';

@Controller('conversations')
export class ConversationsController {
  constructor(private conversationsService: ConversationsService) {}

  @Get()
  async getAllConversations() {
    return await this.conversationsService.getAllConversations();
  }

  
}
