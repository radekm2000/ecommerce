import { HttpException } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { LoginUserDto } from 'src/utils/dtos/user.dto';
import * as bcrypt from 'bcrypt';
describe('Auth login method', () => {
  it('should throw error if credentials are invalid', async () => {
    const user = {
      username: 'usermock',
      id: 1,
      email: 'usermock123@gmail.com',
      password: 'hashedPassword',
    };

    const usersServiceMock = {
      findUser: jest.fn().mockResolvedValue(user),
    } as any;

    const dto: LoginUserDto = {
      password: 'notHashedPassword',
      username: 'usermock',
    };

    const authService = new AuthService(usersServiceMock, {} as any);

    try {
      await authService.login(dto, {} as any);
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
      expect(error.response).toEqual('Invalid credentials');
    }
  });
  it('should return access token', async () => {
    const user = {
      username: 'usermock',
      id: 1,
      email: 'usermock123@gmail.com',
      password: 'hashedPassword',
    };
    const responseMock = {
      cookie: jest.fn(),
    } as any;
    const usersServiceMock = {
      findUser: jest.fn().mockResolvedValue(user),
    } as any;

    const dto: LoginUserDto = {
      password: 'hashedPassword',
      username: 'usermock',
    };
    jest.spyOn(bcrypt, 'compare').mockImplementation(() => true);

    const accessToken = 'accesstoken123';
    const jwtService = {
      signAsync: jest.fn().mockResolvedValue(accessToken),
    } as any;
    const authService = new AuthService(usersServiceMock, jwtService);

    try {
      const result = await authService.login(dto, responseMock);
      expect(jwtService.signAsync).toHaveBeenCalledTimes(2);
      expect(result).toEqual(accessToken);
    } catch (error) {}
  });
});

describe('Auth handleRefreshToken method', () => {
  it('should throw error if refresh token is not found in cookies', async () => {
    const req = {
      cookies: {
        refreshToken: null,
      },
    } as any;
    const usersServiceMock = {} as any;
    const jwtService = {} as any;
    const authService = new AuthService(usersServiceMock, jwtService);
    try {
      await authService.handleRefreshToken(req);
    } catch (error) {
      expect(error.response).toEqual('Unauthorized');
    }
  });
  it('should return new access token and username', async () => {
    const req = {
      cookies: {
        refreshToken: 'refreshtoken',
      },
    } as any;
    const payload = {
      username: 'userMock',
      sub: 1,
    };
    const usersServiceMock = {} as any;
    const jwtService = {
      verifyAsync: jest.fn().mockResolvedValue(payload),
      signAsync: jest.fn().mockResolvedValue('accessToken123'),
    } as any;

    const authService = new AuthService(usersServiceMock, jwtService);
    try {
      const result = await authService.handleRefreshToken(req);
      expect(result.accessToken).toEqual('accessToken123');
      expect(result.username).toEqual('userMock');
    } catch (error) {}
  });
});
