import { GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductsService } from 'src/products/products.service';
import { UsersService } from 'src/users/users.service';
import { ProductNotification } from 'src/utils/entities/product-notification.entity';
import { Product } from 'src/utils/entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductNotificationService {
  constructor(
    @InjectRepository(ProductNotification)
    private productNotificationRepository: Repository<ProductNotification>,
    private usersService: UsersService,
    private productsService: ProductsService,
  ) {}
  async notifyFollowersAboutNewProduct(product: Product) {
    const existingProductWithImage = await this.productsService.findProduct(
      product.id,
    );
    const user = await this.usersService.getUserInfo(product.user.id);
    if (!user) {
      throw new HttpException(
        'Cant notify followers if product has no user assigned',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    const productNotifications = user.followings.map((follow) => ({
      product: existingProductWithImage,
      isRead: false,
      message: `${user.username} has listed a new item ${existingProductWithImage.title} with price ${existingProductWithImage.price} USD`,
      receiverId: follow.follower.id,
    }));

    await this.createProductNotificationsAndInsertThemToDb(
      productNotifications,
    );
  }

  private async createProductNotificationsAndInsertThemToDb(
    productNotifications: {
      product: Product;
      isRead: boolean;
      message: string;
      receiverId: number;
    }[],
  ) {
    const productNotificationEntities =
      this.productNotificationRepository.create(productNotifications);

    await this.productNotificationRepository.insert(
      productNotificationEntities,
    );
    return productNotificationEntities;
  }

  public async markProductNotificationsAsRead(userId: number) {
    return await this.productNotificationRepository.update(
      { receiverId: userId, isRead: false },
      { isRead: true },
    );
  }

  public async getProductNotifications(userId: number) {
    const notifications = await this.productNotificationRepository.find({
      where: {
        receiverId: userId,
      },
      relations: ['product'],
    });

    const updatedNotifications = await Promise.all(
      notifications.map(async (notification) => {
        const product = await this.productsService.findProduct(
          notification.product?.id,
        );
        notification.product = product;

        return notification;
      }),
    );
    return updatedNotifications;
  }

  async deleteProductNotifications(userId: number) {
    return await this.productNotificationRepository.delete({
      receiverId: userId,
    });
  }
}
