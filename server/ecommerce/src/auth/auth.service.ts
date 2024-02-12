/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Request, Response } from 'express';
import { UsersService } from 'src/users/users.service';
import { LoginUserDto, RegisterUserDto } from 'src/utils/dtos/user.dto';
import * as bcrypt from 'bcrypt';
import 'dotenv/config';

import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { Profile } from 'passport-google-oauth20';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  async login(dto: LoginUserDto, res: Response) {
    const user = await this.usersService.findUser(dto);

    const match = await bcrypt.compare(dto.password, user.password);
    if (!match) {
      throw new HttpException(
        'Invalid credentials',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    const payload = { sub: user.id, username: user.username };
    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: '10s',
    });
    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: '24h',
      secret: jwtConstants.secret,
    });
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 1000,
    });
    return { accessToken, user };
  }

  async register(dto: RegisterUserDto) {
    return await this.usersService.register(dto);
  }

  async handleRefreshToken(req: Request) {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    const payload = await this.jwtService.verifyAsync(refreshToken, {
      secret: jwtConstants.secret,
    });
    const accessToken = await this.jwtService.signAsync(
      { username: payload.username, sub: payload.sub },
      { secret: jwtConstants.secret, expiresIn: '15m' },
    );
    return { accessToken, username: payload.username };
  }

  async createOrGetUser(
    profile: Profile,
    googleAccessToken: string,
    googleRefreshToken: string,
  ) {
    const user = await this.usersService.findByEmailAndGetOrCreate(
      profile.emails[0].value,
      profile,
    );
    return user;
  }

  async generateRefreshTokenFor(userId: number) {
    const refreshToken = await this.jwtService.signAsync(
      { sub: userId },
      { secret: jwtConstants.secret, expiresIn: '24h' },
    );
    return refreshToken;
  }

  async refetchUserInfo(userId: number) {
    const user = await this.usersService.findUserById(userId);

    if (!user) {
      throw new HttpException(
        'Cant refetch user info, user doesnt exist',
        HttpStatus.NOT_FOUND,
      );
    }
    console.log(user);
    return user;
  }
}
