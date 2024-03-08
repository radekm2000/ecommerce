import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { ReviewDto } from 'src/utils/dtos/review.dto';
import { Review } from 'src/utils/entities/review.entity';
import { Repository } from 'typeorm';
import 'dotenv/config';
import { User } from 'src/utils/entities/user.entity';
const s3 = new S3Client({
  region: process.env.BUCKET_REGION,
  credentials: {
    accessKeyId: process.env.BUCKET_ACCESS_KEY,
    secretAccessKey: process.env.BUCKET_SECRET_ACCESS_KEY,
  },
});
@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
    private readonly usersService: UsersService,
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}

  async addReview(dto: ReviewDto, reviewCreatorId: number) {
    const reviewCreator = await this.usersService.findUserById(reviewCreatorId);

    const reviewRecipient = await this.usersService.findUserById(
      dto.reviewRecipientId,
    );

    const newReview = this.reviewRepository.create({
      comment: dto.comment,
      rating: dto.rating,
      reviewCreator,
      reviewRecipient,
    });

    return await this.reviewRepository.save(newReview);
  }

  async getUserReviews(userId: number) {
    const reviews = await this.reviewRepository.find({
      where: {
        reviewRecipient: {
          id: userId,
        },
      },
      relations: ['reviewCreator', 'reviewCreator.avatarEntity'],
    });
    for (const review of reviews) {
      const userAvatar = review.reviewCreator.avatarEntity;
      if (userAvatar) {
        const getObjectParams = {
          Bucket: process.env.BUCKET_NAME,
          Key: userAvatar.avatarName,
        };
        const command = new GetObjectCommand(getObjectParams);
        const url = await getSignedUrl(s3, command, { expiresIn: 360000 });

        review.reviewCreator.avatar = url;
        await this.usersRepository.save(review.reviewCreator);
      }
    }
    return reviews;
  }
}
