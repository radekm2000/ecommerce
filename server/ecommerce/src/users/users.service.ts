import {
  GetObjectCommand,
  PutObjectCommand,
  PutObjectCommandInput,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomUUID } from 'crypto';
import { Profile } from 'passport-google-oauth20';
import * as sharp from 'sharp';
import { s3 } from 'src/main';
import { RegisterUserDto } from 'src/utils/dtos/user.dto';
import { Avatar } from 'src/utils/entities/avatar.entity';
import { Follow } from 'src/utils/entities/followers.entity';
import { Profile as userProfile } from 'src/utils/entities/profile.entity';
import { User } from 'src/utils/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Follow) private followsRepository: Repository<Follow>,
    @InjectRepository(User) private usersRepository: Repository<User>,
    @InjectRepository(userProfile)
    private profilesRepository: Repository<userProfile>,
    @InjectRepository(Avatar)
    private avatarRepository: Repository<Avatar>,
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
      where: [{ username: dto.username }, { email: dto.email }],
    });
    if (existingUser) {
      if (existingUser.username === dto.username) {
        throw new HttpException(
          `Username ${dto.username} already exists`,
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
    const newProfile = this.profilesRepository.create({
      user: newUser,
    });
    newUser.profile = newProfile;
    await this.profilesRepository.save(newProfile);
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
        avatarEntity: true,
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

    const userAvatar = user.avatarEntity;
    if (userAvatar) {
      const getObjectParams = {
        Bucket: process.env.BUCKET_NAME,
        Key: userAvatar.avatarName,
      };
      const command = new GetObjectCommand(getObjectParams);
      const url = await getSignedUrl(s3, command, { expiresIn: 360000 });

      user.avatar = url;
      await this.usersRepository.save(user);
    }

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

  async updateUserProfile(
    userProfileInfo: {
      aboutYou?: string;
      country?: 'Poland' | 'England';
    },
    file: Express.Multer.File,
    userId: number,
  ) {
    const user = await this.findUserById(userId);
    if (!user) {
      throw new HttpException(
        'User not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    const profile = await this.profilesRepository.findOne({
      where: {
        user: {
          id: userId,
        },
      },
    });
    if (!profile) {
      throw new HttpException(
        'Profile doesnt exist',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    if (!file && !userProfileInfo) {
      throw new HttpException(
        `No changes were given`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    if (!file) {
      if (!userProfileInfo.aboutYou) {
        profile.country = userProfileInfo.country;
        return await this.profilesRepository.save(profile);
      } else if (!userProfileInfo.country) {
        profile.aboutYou = userProfileInfo.aboutYou;
        return await this.profilesRepository.save(profile);
      } else {
        profile.country = userProfileInfo.country;
        profile.aboutYou = userProfileInfo.aboutYou;

        return await this.profilesRepository.save(profile);
      }
    } else {
      profile.country = userProfileInfo.country;
      profile.aboutYou = userProfileInfo.aboutYou;
      await this.profilesRepository.save(profile);
      //update avatar
      const buffer = await sharp(file.buffer)
        .resize({
          height: 2000,
          width: 2000,
          withoutEnlargement: true,
          fit: 'inside',
        })
        .withMetadata()
        .jpeg({ quality: 80 })
        .toBuffer();
      const avatarImageName = `${randomUUID()}${file.originalname}`;
      const avatar = this.avatarRepository.create({
        avatarName: avatarImageName,
        user: user,
      });
      await this.avatarRepository.save(avatar);

      user.avatarEntity = avatar;
      await this.usersRepository.save(user);
      const paramsToS3 = {
        Bucket: process.env.BUCKET_NAME,
        Key: avatarImageName,
        Body: buffer,
        ContentType: file.mimetype,
      } as PutObjectCommandInput;

      const command = new PutObjectCommand(paramsToS3);
      try {
        await s3.send(command);
        const getObjectParams = {
          Bucket: process.env.BUCKET_NAME,
          Key: avatarImageName,
        };
        const getObjectCommand = new GetObjectCommand(getObjectParams);
        const url = await getSignedUrl(s3, getObjectCommand, {
          expiresIn: 3600,
        });

        user.avatar = url;
        await this.usersRepository.save(user);
        console.log(user);
        return user;
      } catch (error) {
        return 'Failed uploading avatar to s3 bucket';
      }
    }
  }
}
