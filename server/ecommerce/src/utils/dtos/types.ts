import { Follow } from '../entities/followers.entity';
import { Product } from '../entities/product.entity';
import { Review } from '../entities/review.entity';
import { User } from '../entities/user.entity';

export type Order = 'price_high_to_low' | 'price_low_to_high';

export type Brand =
  | 'Zara'
  | 'Reserved'
  | 'Nike'
  | 'House'
  | 'Adidas'
  | '4F'
  | 'Calvin Klein'
  | '';

export type QueryParams = {
  order: Order;
  brand: Brand;
  category: 'Men' | 'Women' | 'All';
  search_text: string;
};

export type Notification = {
  isRead: boolean;
  date: Date;
  senderId: number;
  receiverId: number;
};
export type FeatureType = 'other' | 'enhancement' | 'bug' | 'new feature';

export enum UserRole {
  User = 'user',
  Admin = 'admin',
  discordUser = 'discordUser',
}

export type ExtendedUser = {
  id: number;
  discordId: string;
  reviews: Review[];
  products: Product[];
};

export type SyncUserRolesEvent = {
  user: ExtendedUser;
};
