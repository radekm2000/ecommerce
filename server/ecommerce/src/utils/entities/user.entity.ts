import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Product } from './product.entity';
import { Profile } from './profile.entity';
import { Follow } from './followers.entity';
import { Message } from './message.entity';
import { Avatar } from './avatar.entity';
import { Review } from './review.entity';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ nullable: true })
  googleId: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  password: string;

  @OneToOne(() => Profile, (profile) => profile.user, { cascade: true })
  @JoinColumn()
  profile: Profile;

  @Column({ default: 'user' })
  role: 'admin' | 'user';

  @Column({ nullable: true })
  avatar: string;

  @OneToOne(() => Avatar, (avatarEntity) => avatarEntity.user)
  @JoinColumn()
  avatarEntity: Avatar;

  @OneToMany(() => Follow, (follow) => follow.follower)
  followers: Follow[];

  @OneToMany(() => Follow, (follow) => follow.following)
  followings: Follow[];

  @OneToMany(() => Product, (product) => product.user)
  products: Product[];

  @OneToMany(() => Message, (message) => message.author)
  messages: Message[];

  @OneToMany(() => Review, (review) => review.reviewRecipient)
  reviews: Review[];


  @BeforeInsert()
  async hashPassword() {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }
}
