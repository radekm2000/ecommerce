import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import {
  NotificationDto,
  NotificationDtoSchema,
  NotificationMarkAsReadDto,
  NotificationMarkAsReadDtoSchema,
} from 'src/utils/dtos/notification.dto';
import { ZodValidationPipe } from 'src/utils/pipes/ZodValidationPipe';
import { NotificationsService } from './notifications.service';
import { AuthUser } from 'src/decorators/user.decorator';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get()
  @UseGuards(AuthGuard)
  async getNotifications(@AuthUser() authUser: AuthUser) {
    return await this.notificationsService.getNotifications(authUser.sub);
  }
  @Post()
  @UsePipes(new ZodValidationPipe(NotificationDtoSchema))
  async addNotification(@Body() dto: NotificationDto) {
    return await this.notificationsService.addNotification(dto);
  }

  @Patch()
  @UseGuards(AuthGuard)
  @UsePipes(new ZodValidationPipe(NotificationMarkAsReadDtoSchema))
  async markNotificationsAsRead(
    @Body() dto: NotificationMarkAsReadDto,
    @AuthUser() authUser: AuthUser,
  ) {
    return await this.notificationsService.markNotificationsAsRead(
      dto.senderId,
      authUser.sub,
    );
  }
}
