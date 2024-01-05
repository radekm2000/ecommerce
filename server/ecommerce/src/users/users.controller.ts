import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { Request } from 'express';
import { AuthUser } from 'src/decorators/user.decorator';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('/profile')
  @UseGuards(AuthGuard)
  async getUser(@Req() request: Request, @AuthUser() authUser: AuthUser) {
    return await this.usersService.findUserById(authUser.sub);
  }
}
