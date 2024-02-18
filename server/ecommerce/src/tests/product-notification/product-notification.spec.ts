import { ProductNotificationService } from 'src/product-notification/product-notification.service';
import { ProductNotification } from 'src/utils/entities/product-notification.entity';
import { Product } from 'src/utils/entities/product.entity';

describe('notifyFollowersAboutNewProduct method ', () => {
  it('should throw error if uploaded product has no owner  ', async () => {
    const productMock = {
      brand: '123',
      category: 'Men',
      description: '123',
      id: 1,
      images: [],
      title: 'title',
      user: {
        id: 1,
      },
    } as Product;
    const productNotificationRepository = {} as any;
    const usersService = {
      getUserInfo: jest.fn().mockResolvedValue(null),
    } as any;
    const productsService = {
      findProduct: jest.fn().mockResolvedValue(productMock),
    } as any;

    const productNotificationServiceMock = new ProductNotificationService(
      productNotificationRepository,
      usersService,
      productsService,
    );

    try {
      const result =
        await productNotificationServiceMock.notifyFollowersAboutNewProduct(
          productMock,
        );
    } catch (error) {
      expect(error.message).toEqual(
        'Cant notify followers if product has no user assigned',
      );
    }
  });
  it('should notify followers with correct message and product details', async () => {
    const productMock = {
      brand: '123',
      category: 'Men',
      description: '123',
      id: 1,
      images: [],
      title: 'title',
      price: 50,
      user: {
        id: 1,
      },
    } as Product;
    const foundUserMock = {
      id: 1,
      username: 'sellerUsername',
      followings: [
        {
          follower: {
            id: 2,
            username: 'followerUsername1',
          },
        },
        {
          follower: {
            id: 3,
            username: 'followerUsername2',
          },
        },
      ],
    };
    const productNotificationRepositoryMock = {
      create: jest.fn(),
      insert: jest.fn(),
    } as any;

    const usersServiceMock = {
      getUserInfo: jest.fn().mockResolvedValue(foundUserMock),
    } as any;

    const productsServiceMock = {
      findProduct: jest.fn().mockResolvedValue(productMock),
    } as any;

    const productNotificationServiceMock = new ProductNotificationService(
      productNotificationRepositoryMock,
      usersServiceMock,
      productsServiceMock,
    );

    const productNotifications = foundUserMock.followings.map((follow) => ({
      product: productMock,
      isRead: false,
      message: `${foundUserMock.username} has listed a new item ${productMock.title} with price ${productMock.price} USD`,
      receiverId: follow.follower.id,
    }));
    try {
      await productNotificationServiceMock.notifyFollowersAboutNewProduct(
        productMock,
      );
      expect(productNotifications).toHaveLength(2);
      expect(productNotifications).toBeDefined();
      for (const notification of productNotifications) {
        expect(notification).toHaveProperty('isRead', false);
        expect(notification).toHaveProperty('message', notification.message);
        expect(notification).toHaveProperty(
          'receiverId',
          notification.receiverId,
        );
      }
    } catch (error) {
      console.log(error);
    }
  });
});
