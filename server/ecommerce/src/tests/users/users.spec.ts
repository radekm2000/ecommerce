import { HttpException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { UserRole } from 'src/utils/dtos/types';
import { RegisterUserDto } from 'src/utils/dtos/user.dto';
import { Avatar } from 'src/utils/entities/avatar.entity';
import { Follow } from 'src/utils/entities/followers.entity';
import { Profile } from 'src/utils/entities/profile.entity';

describe('Users findUser method ', () => {
  let followRepositoryMock: any;
  let profileRepositoryMock: any;
  let avatarRepositoryMock: any;
  let userRepositoryMock: any;
  beforeEach(() => {
    followRepositoryMock = {};
    profileRepositoryMock = {};
    avatarRepositoryMock = {};
    userRepositoryMock = {};
  });
  it('should throw error when user is not found ', async () => {
    const userDto = {
      username: 'usermock',
    };

    userRepositoryMock = {
      findOne: () => jest.fn().mockResolvedValue(false),
    } as any;

    const usersService = new UsersService(
      followRepositoryMock,
      userRepositoryMock,
      profileRepositoryMock,
      avatarRepositoryMock,
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
  let followRepositoryMock: any;
  let profileRepositoryMock: any;
  let avatarRepositoryMock: any;
  let userRepositoryMock: any;
  beforeEach(() => {
    followRepositoryMock = {};
    profileRepositoryMock = {};
    avatarRepositoryMock = {};
    userRepositoryMock = {};
  });
  it('should throw error if username already exists', async () => {
    const userMockInDb = {
      username: 'usermock',
      id: 1,
      email: 'usermock@gmail.com',
    };

    userRepositoryMock = {
      findOne: jest.fn().mockResolvedValue(userMockInDb),
    } as any;

    const usersService = new UsersService(
      followRepositoryMock,
      userRepositoryMock,
      profileRepositoryMock,
      avatarRepositoryMock,
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
      expect(error.response).toEqual(`Username ${dto.username} already exists`);
    }
  });
  it('should throw error if email already exists in db', async () => {
    const userMockInDb = {
      username: 'usermock',
      id: 1,
      email: 'usermock@gmail.com',
    };

    userRepositoryMock = {
      findOne: jest.fn().mockResolvedValue(userMockInDb),
    } as any;

    const usersService = new UsersService(
      followRepositoryMock,
      userRepositoryMock,
      profileRepositoryMock,
      avatarRepositoryMock,
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
    userRepositoryMock = {
      findOne: jest.fn().mockResolvedValue(null),
      create: jest
        .fn()
        .mockResolvedValue({ username: dto.username, email: dto.email, id: 1 }),
      save: jest
        .fn()
        .mockResolvedValue({ username: dto.username, email: dto.email, id: 1 }),
    } as any;

    const usersService = new UsersService(
      followRepositoryMock,
      userRepositoryMock,
      profileRepositoryMock,
      avatarRepositoryMock,
    );

    try {
      const user = await usersService.register(dto);
      expect(user).toBeDefined();
      expect(user.id).toBeDefined();
      expect(user.username).toEqual(dto.username);
    } catch (error) {}
  });
});

describe('Users grantAdminRoleFor method', () => {
  let userRepository: any;
  beforeEach(() => {
    userRepository = {};
  });
  it('should throw error if user does not exist', async () => {
    userRepository = {
      findOne: jest.fn().mockResolvedValue(null),
    };

    const userId = 1;

    const usersService = new UsersService(
      {} as any,
      userRepository,
      {} as any,
      {} as any,
    );

    try {
      await usersService.grantRoleFor(userId, 'user');
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
      expect(error.response).toEqual('User does not exist');
    }
  });
  it('should throw error if user has already this role', async () => {
    const userId = 1;

    const user = {
      id: 1,
      role: UserRole.Admin,
    };
    userRepository = {
      findOne: jest.fn().mockResolvedValue(user),
    };

    const usersService = new UsersService(
      {} as any,
      userRepository,
      {} as any,
      {} as any,
    );

    try {
      await usersService.grantRoleFor(userId, 'admin');
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
      expect(error.response).toEqual('User has already this role');
    }
  });
  it('should throw error if trying to assign discordUser role without discord account', async () => {
    const userId = 1;

    const user = {
      id: 1,
      role: UserRole.Admin,
    };
    userRepository = {
      findOne: jest.fn().mockResolvedValue(user),
    };

    const usersService = new UsersService(
      {} as any,
      userRepository,
      {} as any,
      {} as any,
    );
    const newRole = 'discordUser';

    try {
      await usersService.grantRoleFor(userId, newRole);
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
      expect(error.response).toEqual(
        'User cannot get this role without signing in with Discord.',
      );
    }
  });
  it('should grant role for user', async () => {
    const userId = 1;

    const user = {
      id: 1,
      role: UserRole.User,
    };
    userRepository = {
      findOne: jest.fn().mockResolvedValue(user),
      save: jest.fn(),
    };

    const usersService = new UsersService(
      {} as any,
      userRepository,
      {} as any,
      {} as any,
    );
    const newRole = 'admin';

    const updatedUser = {
      ...user,
      role: UserRole.Admin,
    };

    const result = await usersService.grantRoleFor(userId, newRole);

    expect(result).toEqual({
      message: `User has been granted ${newRole} role `,
      updatedUser,
    });
  });
});
