import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotificationDto } from 'src/utils/dtos/notification.dto';
import { Notification } from 'src/utils/entities/notification.entity';
import { Product } from 'src/utils/entities/product.entity';
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
}
