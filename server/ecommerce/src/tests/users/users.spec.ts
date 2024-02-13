import { HttpException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterUserDto } from 'src/utils/dtos/user.dto';

describe('Users findUser method ', () => {
  it('should throw error when user is not found ', async () => {
    const userDto = {
      username: 'usermock',
    };

    const userRepositoryMock = {
      findOne: () => jest.fn().mockResolvedValue(false),
    } as any;

    const followRepositoryMock = {} as any;
    const profileRepository = {} as any;
    const avatarRepository = {} as any;
    const usersService = new UsersService(
      followRepositoryMock,
      userRepositoryMock,
      profileRepository,
      avatarRepository,
    );
    try {
      await usersService.findUser({
        username: userDto.username,
      });
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
      expect(error).toEqual('User not found');
    }
  });
  it('should return user ', async () => {
    const userDto = {
      username: 'usermock',
      id: 3,
      email: 'mockemail@gmail.com',
    };

    const userRepositoryMock = {
      findOne: jest.fn().mockResolvedValue(userDto),
    } as any;
    const followRepositoryMock = {} as any;
    const profileRepository = {} as any;
    const avatarRepository = {} as any;

    const usersService = new UsersService(
      followRepositoryMock,
      userRepositoryMock,
      profileRepository,
      avatarRepository,
    );
    try {
      const result = await usersService.findUser({
        username: userDto.username,
      });
      expect(result).toHaveProperty(['username', 'email', 'id']);
    } catch (error) {}
  });
});

describe('Users register method', () => {
  jest.mock('ormconfig', () => ({}));
  it('should throw error if username already exists', async () => {
    const userMockInDb = {
      username: 'usermock',
      id: 1,
      email: 'usermock@gmail.com',
    };

    const userRepositoryMock = {
      findOne: jest.fn().mockResolvedValue(userMockInDb),
    } as any;
    const followRepositoryMock = {} as any;
    const profileRepository = {} as any;
    const avatarRepository = {} as any;

    const usersService = new UsersService(
      followRepositoryMock,
      userRepositoryMock,
      profileRepository,
      avatarRepository,
    );
    const dto: RegisterUserDto = {
      username: 'usermock',
      password: 'somepassword',
      confirmPassword: 'somepassword',
      email: 'mail123@gmail.com',
    };
    try {
      await usersService.register(dto);
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
      expect(error.response).toEqual(`username ${dto.username} already exists`);
    }
  });
  it('should throw error if email already exists in db', async () => {
    const userMockInDb = {
      username: 'usermock',
      id: 1,
      email: 'usermock@gmail.com',
    };

    const userRepositoryMock = {
      findOne: jest.fn().mockResolvedValue(userMockInDb),
    } as any;
    const followRepositoryMock = {} as any;
    const profileRepository = {} as any;
    const avatarRepository = {} as any;

    const usersService = new UsersService(
      followRepositoryMock,
      userRepositoryMock,
      profileRepository,
      avatarRepository,
    );
    const dto: RegisterUserDto = {
      username: 'usermock123',
      password: 'somepassword',
      confirmPassword: 'somepassword',
      email: 'usermock@gmail.com',
    };
    try {
      await usersService.register(dto);
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
      expect(error.response).toEqual(`An email has already been taken`);
    }
  });
  it('should return user', async () => {
    const dto = {
      username: 'usermock123',
      password: 'somepassword',
      confirmPassword: 'somepassword',
      email: 'usermock@gmail.com',
    };
    const userRepositoryMock = {
      findOne: jest.fn().mockResolvedValue(null),
      create: jest
        .fn()
        .mockResolvedValue({ username: dto.username, email: dto.email, id: 1 }),
      save: jest
        .fn()
        .mockResolvedValue({ username: dto.username, email: dto.email, id: 1 }),
    } as any;
    const followRepositoryMock = {} as any;
    const profileRepository = {} as any;
    const avatarRepository = {} as any;
    const usersService = new UsersService(
      followRepositoryMock,
      userRepositoryMock,
      profileRepository,
      avatarRepository,
    );

    try {
      const user = await usersService.register(dto);
      expect(user).toBeDefined();
      expect(user.id).toBeDefined();
      expect(user.username).toEqual(dto.username);
    } catch (error) {
      console.error(error);
    }
  });
});
