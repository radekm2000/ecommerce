import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import 'dotenv/config';
import * as sharp from 'sharp';

import { FileInterceptor } from '@nestjs/platform-express';
import { randomUUID } from 'crypto';
import { createProductFromJson } from 'src/utils/dtos/product.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { AuthUser } from 'src/decorators/user.decorator';
import { PutObjectCommand, PutObjectCommandInput } from '@aws-sdk/client-s3';
import { s3 } from 'src/main';
import { UsersService } from 'src/users/users.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/utils/entities/product.entity';
import { Repository } from 'typeorm';
import { Image } from 'src/utils/entities/image.entity';
import { ProductsService } from './products.service';
import { QueryParams } from 'src/utils/dtos/types';
@Controller('products')
export class ProductsController {
  constructor(
    private usersService: UsersService,
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @InjectRepository(Image) private imageRepository: Repository<Image>,
    private productsService: ProductsService,
  ) {}

  @Get()
  async getProducts() {
    return await this.productsService.getAllProducts();
  }

  @Get('/filtered')
  async getFilteredProducts(@Query() queryParams: QueryParams) {
    console.log(queryParams);
    if (queryParams.category === 'Men') {
      return await this.productsService.getMenFilteredProducts(queryParams);
    } else if (queryParams.category === 'Women') {
      return await this.productsService.getWomenFilteredProducts(queryParams);
    } else {
      return await this.productsService.getAllProducts();
    }
  }

  @Get('q')
  async searchProducts(@Query('search_text') searchText: string) {
    return await this.productsService.getFilteredSearchTextProducts(searchText);
  }

  @Get(':userId')
  async getUserProducts(@Param('userId', ParseIntPipe) userId: number) {
    const products = await this.productsService.getUserProducts(userId);
    return products;
  }

  @Post('upload')
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async uploadProduct(
    @Body() body: any,
    @UploadedFile() file: Express.Multer.File,
    @AuthUser() authUser: AuthUser,
  ) {
    const productBody = createProductFromJson(body.data);
    const buffer = await sharp(file.buffer)
      .resize({
        height: 260,
        width: 340,
        fit: 'contain',
      })
      .toBuffer();
    const productImageName = `${randomUUID()}${file.originalname}`;

    const existingUser = await this.usersService.findUserById(authUser.sub);
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

    const command = new PutObjectCommand(paramsToS3);

    try {
      await s3.send(command);
    } catch (error) {
      return 'Failed uploading image to s3 bucket';
    }
  }
}
