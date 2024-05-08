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
import { User } from 'src/utils/entities/user.entity';
import { AuthGuard } from './auth.guard';
import { AuthUser } from 'src/decorators/user.decorator';
import { DiscordAuthGuard } from './utils/DiscordGuard';
import { DiscordProfile } from 'src/utils/dtos/discord.dto';

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

  @Post('logout')
  async logout(@Res() response: Response) {
    return await this.authService.logout(response);
  }

  @UseGuards(DiscordAuthGuard)
  @Get('discord/login')
  handleDiscordLogin() {
    //empty method to initialize oauth flow
  }

  @UseGuards(GoogleAuthGuard)
  @Get('google/login')
  handleGoogleLogin() {
    //empty method, passport takes care of google flow
  }

  @Get('getUserInfo')
  @UseGuards(AuthGuard)
  async refetchUserInfo(@AuthUser() authUser: AuthUser) {
    return await this.authService.refetchUserInfo(authUser.sub);
  }
  @UseGuards(GoogleAuthGuard)
  @Get('google/redirect')
  async googleAuthRedirect(@Req() request: Request, @Res() response: Response) {
    const user = request.user as User;
    const refreshToken = await this.authService.generateRefreshTokenFor(
      user.id,
    );
    response.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 1000,
    });
    response.redirect('https://exquisite-pasca-338883.netlify.app');
  }

  @UseGuards(DiscordAuthGuard)
  @Get('discord/redirect')
  async disordAuthRedirect(@Req() request: Request, @Res() response: Response) {
    const user = request.user as DiscordProfile;
    console.log(user);
    const refreshToken = await this.authService.generateRefreshTokenFor(
      Number(user.id),
    );
    response.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 1000,
    });
    response.redirect('http://localhost:5173');
  }
}
