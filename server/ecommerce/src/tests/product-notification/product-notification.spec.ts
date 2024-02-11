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
    } as Product;
    const productNotificationRepository = {} as any;
    const usersService = {
      getUserInfo: jest.fn().mockResolvedValue(null),
    } as any;
    const productsService = {} as any;

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
      expect(error).toEqual(
        'Cant notify followers if product has no user assigned',
      );
    }
  });
});
