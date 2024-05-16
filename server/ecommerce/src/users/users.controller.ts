import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { Request } from 'express';
import { AuthUser } from 'src/decorators/user.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { RoleGuard } from 'src/auth/utils/role.guard';
import { UserRole } from 'src/utils/dtos/types';
import { ZodValidationPipe } from 'src/utils/pipes/ZodValidationPipe';
import { EditRoleDto, EditRoleDtoSchema } from 'src/utils/dtos/user.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @UseGuards(AuthGuard)
  async getUsers() {
    return await this.usersService.getUsers();
  }

  @Get('/profile')
  @UseGuards(AuthGuard)
  async getUser(@Req() request: Request, @AuthUser() authUser: AuthUser) {
    return await this.usersService.findUserById(authUser.sub);
  }

  @Get(':id')
  async getUserInfo(@Param('id', ParseIntPipe) userId: number) {
    return await this.usersService.getUserInfo(userId);
  }

  @Get('/basic/:id')
  async getBasicUserInfo(@Param('id', ParseIntPipe) userId: number) {
    return await this.usersService.findUserById(userId);
  }

  @UseGuards(AuthGuard)
  @Get('/all/:name')
  async searchUsersByInput(
    @AuthUser() authUser: AuthUser,
    @Param('name') userName: string,
  ) {
    return await this.usersService.findUsersByName(userName, authUser.sub);
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
    return await this.usersService.updateUserProfile(
      userInfo,
      file,
      authUser.sub,
    );
  }

  @UseGuards(RoleGuard(UserRole.Admin))
  @UsePipes(new ZodValidationPipe(EditRoleDtoSchema))
  @Patch('grantRole/:userId')
  async grantRole(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() dto: EditRoleDto,
  ) {
    return await this.usersService.grantRoleFor(userId, dto.role);
  }
}
