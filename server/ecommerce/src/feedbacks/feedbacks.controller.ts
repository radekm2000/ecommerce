import { Body, Controller, Get, Post, UsePipes } from '@nestjs/common';
import { FeedbacksService } from './feedbacks.service';
import { ZodValidationPipe } from 'src/utils/pipes/ZodValidationPipe';
import { FeedbackDto, FeedbackDtoSchema } from 'src/utils/dtos/feedback.dto';

@Controller('feedbacks')
export class FeedbacksController {
  constructor(private readonly feedbacksService: FeedbacksService) {}

  @Get()
  async getFeedbacks() {
    return await this.feedbacksService.getFeedbacks();
  }

  @Post()
  @UsePipes(new ZodValidationPipe(FeedbackDtoSchema))
  async addFeedback(@Body() dto: FeedbackDto) {
    return await this.feedbacksService.addFeedback(dto);
  }
}
