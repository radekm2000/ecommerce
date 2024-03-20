import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { adminNotificationDto } from 'src/utils/dtos/admin-notifications.dto';
import { AdminNotifications } from 'src/utils/entities/adminNotifications.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AdminNotificationsService {
  constructor(
    @InjectRepository(AdminNotifications)
    private readonly adminNotificationsRepository: Repository<AdminNotifications>,
  ) {}
  async create(dto: adminNotificationDto) {
    const newAdminNotification = this.adminNotificationsRepository.create({
      action: dto.action,
      username: dto.username,
    });

    return await this.adminNotificationsRepository.save(newAdminNotification);
  }

  async getAllNotifications() {
    return await this.adminNotificationsRepository.find({});
  }
}
