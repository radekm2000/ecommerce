import { FeedbackDto } from 'src/utils/dtos/feedback.dto';
import { Feedback } from 'src/utils/entities/feedback.entity';

export interface feedbacksI {
  getFeedbacks(): Promise<Feedback[]>;
  addFeedback(dto: FeedbackDto): Promise<Feedback>;
}
