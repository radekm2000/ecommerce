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

  @OneToMany(() => Product, (product) => product.user)
  products: Product[];

  @BeforeInsert()
  async hashPassword() {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }
}
