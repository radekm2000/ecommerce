import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from 'passport-google-oauth20';
import { RegisterUserDto } from 'src/utils/dtos/user.dto';
import { Follow } from 'src/utils/entities/followers.entity';
import { User } from 'src/utils/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Follow) private followsRepository: Repository<Follow>,
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async findUser({
    username,
    email,
    id,
  }: {
    username?: string;
    email?: string;
    id?: number;
  }): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { username: username, email: email, id: id },
    });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async register(dto: RegisterUserDto): Promise<User> {
    const existingUser = await this.usersRepository.findOne({
      where: { username: dto.username, email: dto.email },
    });

    if (existingUser) {
      if (existingUser.username === dto.username) {
        throw new HttpException(
          `username ${dto.username} already exists`,
          HttpStatus.CONFLICT,
        );
      } else if (existingUser.email === dto.email) {
        throw new HttpException(
          `An email has already been taken`,
          HttpStatus.CONFLICT,
        );
      }
    }

    const newUser = this.usersRepository.create(dto);
    return await this.usersRepository.save(newUser);
  }

  async findByEmailAndGetOrCreate(
    email: string,
    profile: Profile,
  ): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: {
        email: email,
      },
    });
    if (!user) {
      const newUser = this.usersRepository.create({
        email: email,
        username: profile.displayName,
        googleId: profile.id,
        avatar: profile.photos[0].value,
      });
      await this.usersRepository.save(newUser);
      return newUser;
    } else {
      await this.usersRepository.save(user);
      return user;
    }
  }

  async findUserById(userId: number) {
    const user = await this.usersRepository.findOne({
      where: {
        id: userId,
      },
    });
    if (!user) {
      throw new HttpException(
        'User with given id not found',
        HttpStatus.NOT_FOUND,
      );
    }
    return user;
  }

  public async getUserInfo(userId: number) {
    const user = await this.usersRepository.findOne({
      where: {
        id: userId,
      },
      relations: {
        products: true,
        profile: true,
        followers: true,
        followings: true,
      },
    });
    if (!user) {
      throw new HttpException(
        'User not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    const followers = user.followers;
    const followings = user.followings;
    const detailedFollowings = [];
    const detailedFollowers = [];

    if (followings) {
      for (const following of followings) {
        const detailedFollowing = await this.followsRepository.findOne({
          where: {
            id: following.id,
          },
          relations: ['following', 'follower'],
        });

        if (detailedFollowing) {
          detailedFollowings.push(detailedFollowing);
        }
      }
    }

    if (followers) {
      for (const follower of followers) {
        const detailedFollower = await this.followsRepository.findOne({
          where: {
            id: follower.id,
          },
          relations: ['follower', 'following'],
        });

        if (detailedFollower) {
          detailedFollowers.push(detailedFollower);
        }
      }
    }

    const updatedUser = {
      ...user,
      followings: detailedFollowings,
      followers: detailedFollowers,
    };

    return updatedUser;
  }
}
