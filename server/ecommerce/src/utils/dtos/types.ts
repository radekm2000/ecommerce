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
