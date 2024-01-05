import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Image } from './image.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  brand: string;

  @Column()
  category: 'men' | 'women' | string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @OneToMany(() => Image, (image) => image.product, { cascade: true })
  images: Image[];

  @ManyToOne(() => User, (user) => user.products, { cascade: true })
  user: User;
}
