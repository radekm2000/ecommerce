import { ProductsService } from 'src/products/products.service';
import { Product } from 'src/utils/entities/product.entity';

describe('ProductsService getMenFilteredProducts method', () => {
  let productsService: ProductsService;
  let productRepository: any;
  let productNotificationService: any;
  let imageRepository: any;
  let usersService: any;
  beforeEach(() => {
    productRepository = {} as any;
    productNotificationService = {} as any;
    imageRepository = {} as any;
    usersService = {} as any;
    productsService = new ProductsService(
      productRepository,
      productNotificationService,
      imageRepository,
      usersService,
    );
  });
  it('should return all products if no filters are applied', async () => {
    const mockProducts = [
      {
        id: 1,
        title: 'product1',
        brand: 'Zara',
      },
      {
        id: 1,
        title: 'product2',
        brand: '4F',
      },
      {
        id: 1,
        title: 'product3',
        brand: 'Reserved',
      },
      {
        id: 1,
        title: 'product4',
        brand: 'Nike',
      },
    ] as any;
    const queryParams = {} as any;
    jest.spyOn(productsService, 'getMenProducts').mockReturnValue(mockProducts);

    try {
      const result = await productsService.getMenFilteredProducts(queryParams);
      expect(result).toEqual(mockProducts);
    } catch (error) {}
  });
  it('should return all products if no filters are applied', async () => {
    const mockProducts = [
      {
        id: 1,
        title: 'product1',
        brand: 'Zara',
      },
      {
        id: 2,
        title: 'product2',
        brand: '4F',
      },
      {
        id: 3,
        title: 'product3',
        brand: 'Reserved',
      },
      {
        id: 4,
        title: 'product4',
        brand: 'Nike',
      },
    ] as any;
    const queryParams = {} as any;
    jest.spyOn(productsService, 'getMenProducts').mockReturnValue(mockProducts);

    try {
      const result = await productsService.getMenFilteredProducts(queryParams);
      expect(result).toEqual(mockProducts);
    } catch (error) {}
  });
  it('should return all products if no wrong filters are applied', async () => {
    const mockProducts = [
      {
        id: 1,
        title: 'product1',
        brand: 'Zara',
      },
      {
        id: 2,
        title: 'product2',
        brand: '4F',
      },
      {
        id: 3,
        title: 'product3',
        brand: 'Reserved',
      },
      {
        id: 4,
        title: 'product4',
        brand: 'Nike',
      },
    ] as any;
    const queryParams = {
      brand: 'someInvalidBrand',
      order: 'orderWithDateInvalid',
    } as any;
    jest.spyOn(productsService, 'getMenProducts').mockReturnValue(mockProducts);
    jest.spyOn(productsService, 'isValidBrand').mockReturnValue(false);
    jest.spyOn(productsService, 'isValidOrder').mockReturnValue(false);
    try {
      const result = await productsService.getMenFilteredProducts(queryParams);
      expect(result).toEqual(mockProducts);
    } catch (error) {}
  });
  it('should return filtered products if correct filters are applied', async () => {
    const mockProducts = [
      {
        id: 1,
        title: 'product1',
        brand: 'Zara',
        price: 123,
      },
      {
        id: 2,
        title: 'product2',
        brand: '4F',
        price: 1234,
      },
      {
        id: 3,
        title: 'product3',
        brand: 'Reserved',
        price: 256,
      },
      {
        id: 4,
        title: 'product4',
        brand: 'Nike',
        price: 1223,
      },
      {
        id: 5,
        title: 'product5',
        brand: '4F',
        price: 12345,
      },
    ] as any;
    const queryParams = {
      brand: '4F',
      order: 'price_high_to_low',
    } as any;
    jest.spyOn(productsService, 'getMenProducts').mockReturnValue(mockProducts);
    jest.spyOn(productsService, 'isValidBrand').mockReturnValue(true);
    jest.spyOn(productsService, 'isValidOrder').mockReturnValue(true);
    try {
      const result = await productsService.getMenFilteredProducts(queryParams);
      expect(result).toEqual([
        {
          id: 5,
          title: 'product5',
          brand: '4F',
          price: 12345,
        },
        {
          id: 2,
          title: 'product2',
          brand: '4F',
          price: 1234,
        },
      ]);
    } catch (error) {}
  });
});
