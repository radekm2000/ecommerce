import { Module } from '@nestjs/common';
import { AdminNotificationsController } from './admin-notifications.controller';
import { AdminNotificationsService } from './admin-notifications.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminNotifications } from 'src/utils/entities/adminNotifications.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AdminNotifications])],
  controllers: [AdminNotificationsController],
  providers: [AdminNotificationsService],
})
export class AdminNotificationsModule {}
