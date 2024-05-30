import { Injectable } from '@nestjs/common';
import { ItemNotifier } from './item-notifier';
import { UsersService } from 'src/users/users.service';
import { DiscordNotificationsService } from 'src/discord-notifications/discord-notifications.service';
import { Product } from 'src/utils/entities/product.entity';

@Injectable()
export class ItemNotifierService {
  private readonly itemNotifier: ItemNotifier;

  constructor(
    private usersService: UsersService,
    private discordNotificationsService: DiscordNotificationsService,
  ) {
    this.itemNotifier = new ItemNotifier({
      bot: this.discordNotificationsService.discordNotificationsBot,
      usersService: this.usersService,
    });
  }

  public notifyUsers = async (userId: number, product: Product) => {
    return await this.itemNotifier.notifyUsers(userId, product);
  };
}
