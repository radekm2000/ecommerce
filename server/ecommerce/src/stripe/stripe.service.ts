import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import 'dotenv/config';
import { NodemailerService } from 'src/nodemailer/nodemailer.service';
import { AuthUser } from 'src/decorators/user.decorator';
import { ProductWithImageAndUser } from 'src/utils/dtos/product.dto';
import { UsersService } from 'src/users/users.service';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const BASE_URL =
  process.env.IS_DEV === 'true'
    ? 'http://localhost:5173'
    : 'https://exquisite-pasca-338883.netlify.app';
@Injectable()
export class StripeService {
  constructor(
    private nodemailerService: NodemailerService,
    private usersService: UsersService,
  ) {}
  public async retrieveStripeSession(stripeId: string) {
    const session = await stripe.checkout.sessions.retrieve(stripeId);
    const customerEmail = session.customer_details.email;
    const lineItems = await stripe.checkout.sessions.listLineItems(stripeId, {
      expand: ['data.price.product'],
    });
    const itemOwnerId = lineItems.data.map((lineItem) => {
      return parseInt(
        (lineItem.price.product as Stripe.Product).metadata.owner,
      );
    });
    lineItems.data.map((item) => {
      console.log(item.price.currency);
      console.log(item.price.unit_amount);
    });
    const itemDescription = lineItems.data.map((item) => {
      return item.description;
    });
    const itemPrice = lineItems.data.map((item) => {
      return {
        unit: item.price.currency,
        amount: item.price.unit_amount,
      };
    });
    if (session.payment_status === 'paid') {
      await this.nodemailerService.sendEmail(customerEmail, itemDescription);
      return {
        ...session,
        itemOwnerId: itemOwnerId,
        itemDescription: itemDescription,
        itemPrice: itemPrice,
      };
    }
    return {
      ...session,
      itemOwnerId: itemOwnerId,
      itemDescription: itemDescription,
      itemPrice: itemPrice,
    };
  }
  public async createStripeCheckoutSession(
    authUser: AuthUser,
    dto: ProductWithImageAndUser,
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
            currency: 'pln',
            product_data: {
              name: `${dto.title}`,
              images: [dto.images[0].imageUrl],

              metadata: {
                owner: dto.user.id,
              },
            },

            unit_amount: dto.price * 100,
          },

          quantity: 1,
        },
      ],

      customer: customer.id,

      payment_method_types: ['card', 'blik'],
      mode: 'payment',
      allow_promotion_codes: true,
      success_url: `${BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${BASE_URL}/cancel`,
      custom_text: {
        submit: {
          message: `Card number 4242 4242 4242 4242 for succesfull payment and feel free to use 20% off coupon with code: ${promotionCode.code} `,
        },
      },
    });
    return session.url;
  }
}
