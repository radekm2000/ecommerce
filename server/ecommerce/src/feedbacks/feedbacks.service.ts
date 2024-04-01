import { Injectable } from '@nestjs/common';
import { feedbacksI } from './feedbacksInterface';
import { Feedback } from 'src/utils/entities/feedback.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FeedbackDto } from 'src/utils/dtos/feedback.dto';

@Injectable()
export class FeedbacksService implements feedbacksI {
  constructor(
    @InjectRepository(Feedback)
    private feedbackRepository: Repository<Feedback>,
  ) {}
  async addFeedback(dto: FeedbackDto): Promise<Feedback> {
    const newFeedback = this.feedbackRepository.create(dto);
    return await this.feedbackRepository.save(newFeedback);
  }

  async getFeedbacks(): Promise<Feedback[]> {
    return await this.feedbackRepository.find({});
  }
}
