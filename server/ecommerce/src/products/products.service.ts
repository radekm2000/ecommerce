import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/utils/entities/product.entity';
import { Repository } from 'typeorm';
import 'dotenv/config';
import { GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { s3 } from 'src/main';

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
}
