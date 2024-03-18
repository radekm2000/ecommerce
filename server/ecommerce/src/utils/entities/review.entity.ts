import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  comment: string;

  @Column()
  rating: number;

  @ManyToOne(() => User, (user) => user.reviews)
  reviewRecipient: User;

  @ManyToOne(() => User)
  @JoinColumn()
  reviewCreator: User;

  @UpdateDateColumn()
  createdAt: Date;
}
