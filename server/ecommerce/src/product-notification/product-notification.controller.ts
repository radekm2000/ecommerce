import { Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { AuthUser } from 'src/decorators/user.decorator';
import { ProductNotificationService } from './product-notification.service';

@Controller('product-notifications')
export class ProductNotificationController {
  constructor(private productNotificationService: ProductNotificationService) {}

  @Get()
  @UseGuards(AuthGuard)
  async getProductNotifications(@AuthUser() authUser: AuthUser) {
    return await this.productNotificationService.getProductNotifications(
      authUser.sub,
    );
  }

  @UseGuards(AuthGuard)
  @Patch()
  async markProductNotificationAsRead(@AuthUser() authUser: AuthUser) {
    return await this.productNotificationService.markProductNotificationsAsRead(
      authUser.sub,
    );
  }
}
