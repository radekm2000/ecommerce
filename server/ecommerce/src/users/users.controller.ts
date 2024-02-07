import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { Request } from 'express';
import { AuthUser } from 'src/decorators/user.decorator';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('/profile')
  @UseGuards(AuthGuard)
  async getUser(@Req() request: Request, @AuthUser() authUser: AuthUser) {
    return await this.usersService.findUserById(authUser.sub);
  }

  @Get(':id')
  async getUserInfo(@Param('id', ParseIntPipe) userId: number) {
    return await this.usersService.getUserInfo(userId);
  }

  @Post('profile/update')
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async updateProfile(
    @Body() body: any,
    @UploadedFile() file: Express.Multer.File,
    @AuthUser() authUser: AuthUser,
  ) {
    const parsedContent = JSON.parse(body.data);

    const userInfo = parsedContent as {
      aboutYou?: string;
      country?: 'Poland' | 'England';
    };
    await this.usersService.updateUserProfile(userInfo, file, authUser.sub);
  }
}
