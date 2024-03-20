import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from '../ormconfig';
import { ProductsModule } from './products/products.module';
import { ImagesModule } from './images/images.module';
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

@Module({
  imports: [
    UsersModule,
    AuthModule,
    TypeOrmModule.forRoot(config),
    ProductsModule,
    ImagesModule,
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
