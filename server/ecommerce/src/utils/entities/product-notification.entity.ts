import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from './product.entity';
@Entity()
export class ProductNotification {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  message: string;

  @Column()
  isRead: boolean;

  @ManyToOne(() => Product, (product) => product.notifications)
  @JoinColumn({ name: 'productId' })
  product: Product;

  @Column()
  receiverId: number;
}
