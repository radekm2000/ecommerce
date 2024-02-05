import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './product.entity';

@Entity()
export class Image {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  imageUrl: string | null;

  @Column()
  imageName: string;

  @ManyToOne(() => Product, (product) => product.images, {
    createForeignKeyConstraints: false,
  })
  product: Product;
}
