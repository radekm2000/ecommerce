import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/utils/entities/product.entity';
import { ILike, Repository } from 'typeorm';
import 'dotenv/config';
import {
  GetObjectCommand,
  PutObjectCommand,
  PutObjectCommandInput,
  S3Client,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { Brand, Order, QueryParams } from 'src/utils/dtos/types';
import { ProductNotificationService } from 'src/product-notification/product-notification.service';
import { Image } from 'src/utils/entities/image.entity';
import { createProductFromJson } from 'src/utils/dtos/product.dto';
import * as sharp from 'sharp';
import { randomUUID } from 'crypto';
import { UsersService } from 'src/users/users.service';
import 'dotenv/config';

const s3 = new S3Client({
  region: process.env.BUCKET_REGION,
  credentials: {
    accessKeyId: process.env.BUCKET_ACCESS_KEY,
    secretAccessKey: process.env.BUCKET_SECRET_ACCESS_KEY,
  },
});
@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
    private productsNotificationService: ProductNotificationService,
    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>,
    private usersService: UsersService,
  ) {}

  async findProduct(productId: number) {
    const product = await this.productRepository.findOne({
      where: {
        id: productId,
      },
      relations: ['images', 'user'],
    });

    for (const image of product.images) {
      const getObjectParams = {
        Bucket: process.env.BUCKET_NAME,
        Key: image.imageName,
      };
      const command = new GetObjectCommand(getObjectParams);
      const url = await getSignedUrl(s3, command, { expiresIn: 3600 });

      image.imageUrl = url;
    }

    return product;
  }
  async signImageToProduct(product: Product) {
    for (const image of product.images) {
      const getObjectParams = {
        Bucket: process.env.BUCKET_NAME,
        Key: image.imageName,
      };
      const command = new GetObjectCommand(getObjectParams);
      const url = await getSignedUrl(s3, command, { expiresIn: 3600 });

      image.imageUrl = url;
    }

    return product;
  }

  async getUserProducts(userId: number) {
    const products = await this.productRepository.find({
      where: {
        user: {
          id: userId,
        },
      },
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
        const url = await getSignedUrl(s3, command, { expiresIn: 36000 });

        image.imageUrl = url;
      }
      if (product.user.avatarEntity) {
        const getObjectParams = {
          Bucket: process.env.BUCKET_NAME,
          Key: product.user.avatarEntity.avatarName,
        };
        const command = new GetObjectCommand(getObjectParams);
        const url = await getSignedUrl(s3, command, { expiresIn: 36000 });

        product.user.avatar = url;
      }
    }
    return products;
  }
  async getFilteredSearchTextProducts(searchText: string) {
    const products = await this.productRepository.find({
      where: [
        {
          description: ILike(`%${searchText}%`),
        },
        { title: ILike(`%${searchText}%`) },
      ],
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
    console.log(products);
    return products;
  }

  async getWomenFilteredProducts(queryParams: QueryParams) {
    const products = await this.productRepository.find({
      where: {
        category: 'Women',
      },
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
    if (!queryParams.brand && !queryParams.order) {
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
      const productsSorted = await this.sortByPrice(
        queryParams.order,
        products,
      );
      return productsSorted;
    }
    return products;
  }

  async getMenProducts() {
    const products = await this.productRepository.find({
      where: {
        category: 'Men',
      },
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

  async getMenFilteredProducts(queryParams: QueryParams) {
    const products = await this.getMenProducts();
    if (!queryParams.brand && !queryParams.order) {
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
      const productsSorted = await this.sortByPrice(
        queryParams.order,
        products,
      );
      return productsSorted;
    }
    return products;
  }

  async sortByPrice(order: Order, products: Product[]) {
    const sortedProducts = [...products];

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

  public isValidBrand(brand: any): brand is Brand {
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

  public isValidOrder(order: string): order is Order {
    console.log(order);
    const validOrders: Order[] = ['price_high_to_low', 'price_low_to_high'];

    return validOrders.includes(order as Order);
  }

  async deleteProduct(productId: number) {
    await this.productRepository.delete({ id: productId });
    await this.productsNotificationService.deleteProductNotificationsOfSelectedProduct(
      productId,
    );
    return;
  }

  async uploadProduct(body: any, file: Express.Multer.File, userId: number) {
    const productBody = createProductFromJson(body.data);
    const buffer = await sharp(file.buffer)
      .resize({
        height: 500,
        width: 500,
        fit: 'contain',
      })
      .toBuffer();
    const productImageName = `${randomUUID()}${file.originalname}`;

    const existingUser = await this.usersService.findUserById(userId);
    const newProduct = this.productRepository.create(productBody);
    newProduct.user = existingUser;
    await this.productRepository.save(newProduct);
    const image = this.imageRepository.create({
      imageName: productImageName,
      product: newProduct,
    });
    await this.imageRepository.save(image);
    const paramsToS3 = {
      Bucket: process.env.BUCKET_NAME,
      Key: productImageName,
      Body: buffer,
      ContentType: file.mimetype,
    } as PutObjectCommandInput;
    await this.productsNotificationService.notifyFollowersAboutNewProduct(
      newProduct,
    );
    const command = new PutObjectCommand(paramsToS3);

    try {
      await s3.send(command);
    } catch (error) {
      return 'Failed uploading image to s3 bucket';
    }
    return;
  }

  async getPaginatedProducts(limit: number, offset: number) {
    const products = await this.productRepository.find({
      relations: ['user', 'images'],
      take: limit,
      skip: offset,
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
