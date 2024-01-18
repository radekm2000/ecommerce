import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/utils/entities/product.entity';
import { Repository } from 'typeorm';
import 'dotenv/config';
import { GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { s3 } from 'src/main';
import { Brand, Order, QueryParams } from 'src/utils/dtos/types';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) {}

  async getUserProducts(userId: number) {
    const products = await this.productRepository.find({
      where: {
        user: {
          id: userId,
        },
      },
      relations: ['images'],
    });

    for (const product of products) {
      for (const image of product.images) {
        const getObjectParams = {
          Bucket: process.env.BUCKET_NAME,
          Key: image.imageName,
        };
        const command = new GetObjectCommand(getObjectParams);
        const url = await getSignedUrl(s3, command, { expiresIn: 3600 });

        image.imageUrl = url;
      }
    }
    return products;
  }

  public async getAllProducts() {
    const products = await this.productRepository.find({
      relations: ['images', 'user'],
    });

    for (const product of products) {
      for (const image of product.images) {
        const getObjectParams = {
          Bucket: process.env.BUCKET_NAME,
          Key: image.imageName,
        };
        const command = new GetObjectCommand(getObjectParams);
        const url = await getSignedUrl(s3, command, { expiresIn: 3600 });

        image.imageUrl = url;
      }
    }
    return products;
  }

  async getMenProducts() {
    return await this.productRepository.find({
      where: {
        category: 'Men',
      },
    });
  }

  async getMenFilteredProducts(queryParams: QueryParams) {
    const products = await this.productRepository.find({
      where: {
        category: 'Men',
      },
    });
    if (!queryParams) {
      return products;
    }
    if (
      (queryParams.brand && !this.isValidBrand(queryParams.brand)) ||
      (queryParams.order && !this.isValidOrder(queryParams.order))
    ) {
      return products;
    }
    if (queryParams.brand && queryParams.order) {
      const sortedByPrice = await this.sortByPrice(queryParams.order, products);
      return await this.sortByBrand(sortedByPrice, queryParams.brand);
    } else if (queryParams.brand) {
      return await this.sortByBrand(products, queryParams.brand);
    } else if (queryParams.order) {
      const products123 = await this.sortByPrice(queryParams.order, products);
      console.log(products123);
      return products123;
    }
    return products;
  }

  async sortByPrice(order: Order, products: Product[]) {
    const sortedProducts = [...products];
    console.log(order);

    if (order === 'price_high_to_low') {
      sortedProducts.sort((a, b) => b.price - a.price);
    } else if (order === 'price_low_to_high') {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else {
      return;
    }
    return sortedProducts;
  }

  async sortByBrand(products: Product[], brand: Brand) {
    return products.filter((product) => product.brand === brand);
  }

  private isValidBrand(brand: any): boolean {
    const validBrands: Brand[] = [
      'Zara',
      'Reserved',
      'Nike',
      'House',
      'Adidas',
      '4F',
      'Calvin Klein',
    ];
    return validBrands.includes(brand);
  }

  private isValidOrder(order: string): boolean {
    console.log(order);
    const validOrders: Order[] = ['price_high_to_low', 'price_low_to_high'];
    return validOrders.includes(order as Order);
  }
}
