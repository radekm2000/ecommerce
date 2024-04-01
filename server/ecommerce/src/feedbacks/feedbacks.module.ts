import { Module } from '@nestjs/common';
import { FeedbacksController } from './feedbacks.controller';
import { FeedbacksService } from './feedbacks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Feedback } from 'src/utils/entities/feedback.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Feedback])],
  controllers: [FeedbacksController],
  providers: [FeedbacksService],
})
export class FeedbacksModule {}
