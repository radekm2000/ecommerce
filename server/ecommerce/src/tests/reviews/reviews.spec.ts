import { HttpException, HttpStatus } from '@nestjs/common';
import { ReviewsService } from 'src/reviews/reviews.service';
import { User } from 'src/utils/entities/user.entity';

describe('reviews service ADD REVIEW', () => {
  let reviewRepositoryMock: any;
  let usersServiceMock: any;

  beforeEach(() => {
    reviewRepositoryMock = {};
    usersServiceMock = {
      findUserById: jest.fn(),
    };
  });

  it('should throw error if review CREATOR or RECIPIENT dont exist', async () => {
    usersServiceMock.findUserById.mockRejectedValueOnce(
      'User with given id not found',
    );

    const reviewService = new ReviewsService(
      reviewRepositoryMock,
      usersServiceMock,
      {} as any,
    );

    await expect(
      reviewService.addReview(
        {
          comment: 'comment',
          rating: 2,
          reviewRecipientId: 1,
        },
        0,
      ),
    ).rejects.toEqual('User with given id not found');
  });
  it('should ADD REVIEW', async () => {
    const reviewDto = {
      comment: 'blabla',
      rating: 2,
      reviewRecipientId: 2,
    };

    const reviewCreator = {
      id: 1,
    } as unknown as User;

    const reviewRecipient = {
      id: 2,
    } as unknown as User;

    usersServiceMock.findUserById
      .mockResolvedValueOnce(reviewCreator)
      .mockResolvedValueOnce(reviewRecipient);

    const review = {
      comment: reviewDto.comment,
      rating: reviewDto.rating,
      reviewCreator,
      reviewRecipient,
    };

    reviewRepositoryMock = {
      create: jest.fn().mockResolvedValue(review),
      save: jest.fn().mockResolvedValue(review),
    };

    const reviewService = new ReviewsService(
      reviewRepositoryMock,
      usersServiceMock,
      {} as any,
    );

    expect(
      await reviewService.addReview(reviewDto, reviewRecipient.id),
    ).toEqual(review);
  });
});
