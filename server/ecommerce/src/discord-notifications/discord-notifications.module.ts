import { Module } from '@nestjs/common';
import { DiscordNotificationsService } from './discord-notifications.service';
import { ItemNotifier } from 'src/discord-bot/src/commands/notifiers/item-notifier';

@Module({
  providers: [DiscordNotificationsService],
})
export class DiscordNotificationsModule {}
