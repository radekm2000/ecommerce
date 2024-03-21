import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { AuthUser } from 'src/decorators/user.decorator';
import {
  AdminNotificationDtoSchema,
  adminNotificationDto,
} from 'src/utils/dtos/admin-notifications.dto';
import { ZodValidationPipe } from 'src/utils/pipes/ZodValidationPipe';
import { AdminNotificationsService } from './admin-notifications.service';

@Controller('admin-notifications')
export class AdminNotificationsController {
  constructor(
    private readonly adminNotificationsService: AdminNotificationsService,
  ) {}

  @Get()
  async getNotifications() {
    return await this.adminNotificationsService.getAllNotifications();
  }

  @Post()
  @UsePipes(new ZodValidationPipe(AdminNotificationDtoSchema))
  @UseGuards(AuthGuard)
  async create(@Body() dto: adminNotificationDto) {
    return await this.adminNotificationsService.create(dto);
  }
}
