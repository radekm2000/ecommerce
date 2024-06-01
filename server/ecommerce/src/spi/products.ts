import { ProductWithoutImageDto } from 'src/utils/dtos/product.dto';
import { QueryParams } from 'src/utils/dtos/types';
import { Product } from 'src/utils/entities/product.entity';

export const IProductsService = Symbol('ProductsService');

export interface IProductsService {
  findProduct(productId: number): Promise<Product | null>;
  getUserProducts(userId: number): Promise<Product[]>;
  getAllProducts(): Promise<Product[]>;
  getFilteredSearchTextProducts(searchText: string): Promise<Product[]>;
  getProductsByCategory(
    category: string,
    queryParams: QueryParams,
  ): Promise<Product[]>;
  getWomenFilteredProducts(queryParams: QueryParams): Promise<Product[]>;
  getMenFilteredProducts(queryParams: QueryParams): Promise<Product[]>;
  getMenProducts(): Promise<Product[]>;
  deleteProduct(productId: number): Promise<void>;
  uploadProduct(
    productBody: ProductWithoutImageDto,
    file: Express.Multer.File,
    userId: number,
  ): Promise<string>;
  getPaginatedProducts(limit: number, offset: number): Promise<Product[]>;
}
