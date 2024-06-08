import { Inject, Injectable, Logger } from '@nestjs/common';
import { ItemNotifier } from './item-notifier';
import { UsersService } from 'src/users/users.service';
import { DiscordNotificationsService } from 'src/discord-notifications/discord-notifications.service';
import { Product } from 'src/utils/entities/product.entity';
import { OnEvent } from '@nestjs/event-emitter';
import { GeneralEvents } from 'src/events/constants/events';
import { ProductsService } from 'src/products/products.service';
import { IProductsService } from 'src/spi/products';

@Injectable()
export class ItemNotifierService {
  private logger: Logger;

  constructor(
    @Inject(ItemNotifier) private readonly itemNotifier: ItemNotifier,
  ) {
    this.logger = new Logger(ItemNotifierService.name);
  }

  @OnEvent(GeneralEvents.ProductCreated, { async: true })
  public async notifyUsers(product: Product) {
    this.logger.log(`${ItemNotifierService.name} recieved an event`);

    try {
      await this.itemNotifier.notifyUsers(product);
    } catch (error) {
      this.logger.error(error.message);
    }
  }
}
