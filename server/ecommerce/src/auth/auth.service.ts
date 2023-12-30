import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Response } from 'express';
import { UsersService } from 'src/users/users.service';
import { LoginUserDto, RegisterUserDto } from 'src/utils/dtos/user.dto';
import * as bcrypt from 'bcrypt';
import 'dotenv/config';

import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
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
      expiresIn: '15m',
    });
    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: '24h',
      secret: jwtConstants.secret,
    });
    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 1000,
    });
    return accessToken;
  }

  async register(dto: RegisterUserDto) {
    return await this.usersService.register(dto);
  }
}
