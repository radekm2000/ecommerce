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
};
