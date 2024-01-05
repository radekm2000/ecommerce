import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseFilters,
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
  handleGoogleLogin() {
    //empty method, passport takes care of google flow
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
    response.redirect('http://localhost:5173');
  }
}
