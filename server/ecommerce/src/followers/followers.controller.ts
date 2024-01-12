import {
  Controller,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { AuthUser } from 'src/decorators/user.decorator';
import { FollowersService } from './followers.service';

@Controller('followers')
export class FollowersController {
  constructor(private followersService: FollowersService) {}

  @Post('follow/:userId')
  @UseGuards(AuthGuard)
  async followUser(
    @Param('userId', ParseIntPipe) userId: number,
    @AuthUser() authUser: AuthUser,
  ) {
    return await this.followersService.followUser(userId, authUser);
  }
}
