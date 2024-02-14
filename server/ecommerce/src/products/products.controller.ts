import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import 'dotenv/config';
import * as sharp from 'sharp';
import Stripe from 'stripe';

import { FileInterceptor } from '@nestjs/platform-express';
import { randomUUID } from 'crypto';
import {
  ProductWithImageAndUser,
  ProductWithImageAndUserSchema,
  createProductFromJson,
} from 'src/utils/dtos/product.dto';
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
import { ZodValidationPipe } from 'src/utils/pipes/ZodValidationPipe';
import { Response } from 'express';
import { ProductNotificationService } from 'src/product-notification/product-notification.service';
import { NodemailerService } from 'src/nodemailer/nodemailer.service';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

@Controller('products')
export class ProductsController {
  constructor(
    private usersService: UsersService,
    private nodemailerService: NodemailerService,
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @InjectRepository(Image) private imageRepository: Repository<Image>,
    private productsService: ProductsService,
    private productNotificationService: ProductNotificationService,
  ) {}

  @Get()
  async getProducts() {
    return await this.productsService.getAllProducts();
  }
  @Get('/checkout/sessions/:id')
  async retrieveStiripeSession(@Param('id') stripeId: string) {
    const session = await stripe.checkout.sessions.retrieve(stripeId);
    const customerEmail = session.customer_details.email;
    const lineItems = await stripe.checkout.sessions.listLineItems(stripeId);
    const itemDescription = lineItems.data.map((item) => {
      return item.description;
    });
    if (session.payment_status === 'paid') {
      await this.nodemailerService.sendEmail(customerEmail, itemDescription);
      return session;
    }
    return session;
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
    const products =
      await this.productsService.getFilteredSearchTextProducts(searchText);
    return products;
  }

  @Get(':id')
  async getProduct(@Param('id', ParseIntPipe) productId: number) {
    return await this.productsService.findProduct(productId);
  }
  @Get('user/:userId')
  async getUserProducts(@Param('userId', ParseIntPipe) userId: number) {
    console.log(userId);
    const products = await this.productsService.getUserProducts(userId);
    return products;
  }

  @Delete(':id')
  async deleteProduct(@Param('id', ParseIntPipe) productId: number) {
    return await this.productsService.deleteProduct(productId);
  }

  @Post('create-checkout-session')
  @UseGuards(AuthGuard)
  @UsePipes(new ZodValidationPipe(ProductWithImageAndUserSchema))
  async createStripeCheckoutSession(
    @AuthUser() authUser: AuthUser,
    @Body() dto: ProductWithImageAndUser,
    @Res() res: Response,
  ) {
    const user = await this.usersService.findUserById(authUser.sub);
    const customer = await stripe.customers.create({
      name: user.username,
      email: user.email,
    });
    const promotionCode = await stripe.promotionCodes.retrieve(
      'promo_1OjPdSDf8SPGlaVh4SXjWIu1',
    );
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `${dto.title}`,
              images: [dto.images[0].imageUrl],
            },
            unit_amount: dto.price * 100,
          },

          quantity: 1,
        },
      ],
      customer: customer.id,

      payment_method_types: ['card'],
      mode: 'payment',
      allow_promotion_codes: true,
      success_url:
        'http://localhost:5173/success?session_id={CHECKOUT_SESSION_ID}',
      cancel_url: 'http://localhost:5173/cancel',
      custom_text: {
        submit: {
          message: `Card number 4242 4242 4242 4242 for succesfull payment and feel free to use 20% off coupon with code: ${promotionCode.code} `,
        },
      },
    });

    res.json({
      url: session.url,
    });
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
        height: 500,
        width: 500,
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
    await this.productNotificationService.notifyFollowersAboutNewProduct(
      newProduct,
    );
    const command = new PutObjectCommand(paramsToS3);

    try {
      await s3.send(command);
    } catch (error) {
      return 'Failed uploading image to s3 bucket';
    }
  }
}
