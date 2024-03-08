import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { AuthUser } from 'src/decorators/user.decorator';
import { ZodValidationPipe } from 'src/utils/pipes/ZodValidationPipe';
import { ReviewDto, ReviewDtoSchema } from 'src/utils/dtos/review.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Get('/user/:id')
  async getUserReviews(@Param('id', ParseIntPipe) userId: number) {
    return await this.reviewsService.getUserReviews(userId);
  }

  @Post()
  @UsePipes(new ZodValidationPipe(ReviewDtoSchema))
  @UseGuards(AuthGuard)
  async addReview(@AuthUser() authUser: AuthUser, @Body() dto: ReviewDto) {
    return await this.reviewsService.addReview(dto, authUser.sub);
  }
}
