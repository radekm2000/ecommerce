import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ZodValidationPipe } from 'src/utils/pipes/ZodValidationPipe';
import {
  LoginUserDto,
  LoginUserDtoSchema,
  RegisterUserDto,
  RegisterUserDtoSchema,
} from 'src/utils/dtos/user.dto';
import { Request, Response } from 'express';
import { GoogleAuthGuard } from './utils/GoogleGuard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UsePipes(new ZodValidationPipe(LoginUserDtoSchema))
  async login(
    @Res({ passthrough: true }) res: Response,
    @Body() dto: LoginUserDto,
  ) {
    return await this.authService.login(dto, res);
  }

  @Post('register')
  @UsePipes(new ZodValidationPipe(RegisterUserDtoSchema))
  async register(@Body() dto: RegisterUserDto) {
    return await this.authService.register(dto);
  }

  @Get('refresh')
  async refresh(@Req() request: Request) {
    return await this.authService.handleRefreshToken(request);
  }

  @UseGuards(GoogleAuthGuard)
  @Get('google/login')
  handleLogin() {
    return { msg: 'google authentication' };
  }

  @UseGuards(GoogleAuthGuard)
  @Get('google/redirect')
  handleRedirect() {
    return { msg: 'redirect' };
  }
}
