import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  DeleteNotificationDto,
  NotificationDto,
} from 'src/utils/dtos/notification.dto';
import { Notification } from 'src/utils/entities/notification.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification)
    private notificationRepository: Repository<Notification>,
  ) {}
  async addNotification(notification: NotificationDto) {
    const newNotification = this.notificationRepository.create({
      sender: { id: notification.senderId },
      receiver: { id: notification.receiverId },
      isRead: false,
      date: new Date(),
    });
    await this.notificationRepository.save(newNotification);
  }

  async getNotifications(authUserId: number) {
    const notifications = await this.notificationRepository.find({
      where: {
        receiver: { id: authUserId },
      },
      relations: ['receiver', 'sender'],
      select: {
        receiver: { id: true },
        sender: { id: true },
      },
    });
    return notifications;
  }

  async markNotificationsAsRead(senderId: number, authUserId: number) {
    return await this.notificationRepository.update(
      { sender: { id: senderId }, receiver: { id: authUserId } },
      { isRead: true },
    );
  }

  async deleteNotifications(dto: DeleteNotificationDto) {
    const notifications = await this.notificationRepository.find({
      where: [
        {
          receiver: { id: dto.receiverId },
          sender: { id: dto.senderId },
        },
        {
          receiver: { id: dto.senderId },
          sender: { id: dto.receiverId },
        },
      ],
      relations: ['receiver', 'sender'],
    });
    if (!notifications) {
      return;
    }

    return await this.notificationRepository.remove(notifications);
  }
}
