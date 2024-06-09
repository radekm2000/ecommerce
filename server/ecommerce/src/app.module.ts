import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from '../ormconfig';
import { ProductsModule } from './products/products.module';
import { FollowersModule } from './followers/followers.module';
import { ConversationsModule } from './conversations/conversations.module';
import { MessagesModule } from './messages/messages.module';
import { AvatarsModule } from './avatars/avatars.module';
import { NotificationsModule } from './notifications/notifications.module';
import { ProductNotificationModule } from './product-notification/product-notification.module';
import { NodemailerModule } from './nodemailer/nodemailer.module';
import { StripeModule } from './stripe/stripe.module';
import { ReviewsModule } from './reviews/reviews.module';
import { AdminNotificationsModule } from './admin-notifications/admin-notifications.module';
import { FeedbacksModule } from './feedbacks/feedbacks.module';
import { DiscordBotModule } from './discord-bot/discord-bot.module';
import { DiscordNotificationsModule } from './discord-notifications/discord-notifications.module';
import { ItemNotifierModule } from './discord-bot/src/commands/notifiers/item-notifier.module';
import { DiscordGuildModule } from './discord-guild/discord-guild.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { UserSyncModule } from './user-sync/user-sync.module';
import { ScheduleModule } from '@nestjs/schedule';
import { BinanceModule } from './binance/binance.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    TypeOrmModule.forRoot(config),
    ProductsModule,
    FollowersModule,
    ConversationsModule,
    MessagesModule,
    AvatarsModule,
    NotificationsModule,
    ProductNotificationModule,
    NodemailerModule,
    StripeModule,
    ReviewsModule,
    AdminNotificationsModule,
    FeedbacksModule,
    DiscordBotModule,
    DiscordNotificationsModule,
    ItemNotifierModule,
    DiscordGuildModule,
    EventEmitterModule.forRoot(),
    UserSyncModule,
    ScheduleModule.forRoot(),
    BinanceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [EventEmitterModule],
})
export class AppModule {}
