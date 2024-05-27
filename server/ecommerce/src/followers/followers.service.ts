import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthUser } from 'src/decorators/user.decorator';
import { InteractionError } from 'src/discord-bot/src/errors/interactionError';
import { UsersService } from 'src/users/users.service';
import { Follow } from 'src/utils/entities/followers.entity';
import { Equal, Repository } from 'typeorm';

@Injectable()
export class FollowersService {
  constructor(
    @InjectRepository(Follow)
    private followersRepository: Repository<Follow>,
    private usersService: UsersService,
  ) {}
  async followUser(userId: number, authUser: AuthUser) {
    const userToFollow = await this.usersService.findUserById(userId);
    if (!userToFollow) {
      throw new HttpException(
        'Cant follow user that doesnt exist',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const userThatFollowed = await this.usersService.findUserById(authUser.sub);
    if (!userThatFollowed) {
      throw new HttpException(
        'Can`t find user that followed',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const existingRelationship = await this.followersRepository.findOne({
      where: {
        follower: Equal(userThatFollowed.id),
        following: Equal(userToFollow.id),
      },
    });
    if (existingRelationship) {
      return await this.followersRepository.remove(existingRelationship);
    }

    const newFollowerRelation = this.followersRepository.create({
      follower: userThatFollowed,
      following: userToFollow,
    });

    return await this.followersRepository.save(newFollowerRelation);
  }

  public startTracking = async (userId: number, discordUserId: string) => {
    const userToFollow = await this.usersService.findUserById(userId);
    if (!userToFollow) {
      throw new InteractionError('User to start tracking does not exist');
    }

    const userThatFollowed =
      await this.usersService.findUserByDiscordIdBase(discordUserId);

    const existingRelationship = await this.followersRepository.findOne({
      where: {
        follower: Equal(userThatFollowed.id),
        following: Equal(userToFollow.id),
      },
    });
    if (existingRelationship) {
      throw new InteractionError('You already track that user');
    }

    const newFollowerRelation = this.followersRepository.create({
      follower: userThatFollowed,
      following: userToFollow,
    });

    return await this.followersRepository.save(newFollowerRelation);
  };

  public stopTracking = async (userId: number, discordUserId: string) => {
    const userToFollow = await this.usersService.findUserById(userId);
    if (!userToFollow) {
      throw new InteractionError('User to stop tracking does not exist');
    }

    const userThatFollowed =
      await this.usersService.findUserByDiscordIdBase(discordUserId);

    const existingRelationship = await this.followersRepository.findOne({
      where: {
        follower: Equal(userThatFollowed.id),
        following: Equal(userToFollow.id),
      },
    });
    if (!existingRelationship) {
      throw new InteractionError('You dont track that user yet');
    }
    return await this.followersRepository.remove(existingRelationship);
  };
}
