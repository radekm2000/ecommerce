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

import { FileInterceptor } from '@nestjs/platform-express';
import {
  ProductWithImageAndUser,
  ProductWithImageAndUserSchema,
} from 'src/utils/dtos/product.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { AuthUser } from 'src/decorators/user.decorator';
import { ProductsService } from './products.service';
import { QueryParams } from 'src/utils/dtos/types';
import { ZodValidationPipe } from 'src/utils/pipes/ZodValidationPipe';
import { Response } from 'express';
import { StripeService } from 'src/stripe/stripe.service';

@Controller('products')
export class ProductsController {
  constructor(
    private productsService: ProductsService,
    private stripeService: StripeService,
  ) {}

  @Get()
  async getProducts() {
    return await this.productsService.getAllProducts();
  }
  @Get('/checkout/sessions/:id')
  async retrieveStiripeSession(@Param('id') stripeId: string) {
    return await this.stripeService.retrieveStripeSession(stripeId);
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
    const sessionUrl = await this.stripeService.createStripeCheckoutSession(
      authUser,
      dto,
    );
    res.json({
      url: sessionUrl,
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
    return await this.productsService.uploadProduct(body, file, authUser.sub);
  }
}
