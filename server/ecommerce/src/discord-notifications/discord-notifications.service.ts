import { Injectable } from '@nestjs/common';
import { DiscordBotService } from 'src/discord-bot/discord-bot.service';
import { ProductsService } from 'src/products/products.service';
import { Product } from 'src/utils/entities/product.entity';

@Injectable()
export class DiscordNotificationsService {
  public notify = async (userId: number, product: Product) => {
    return;
  };
}
