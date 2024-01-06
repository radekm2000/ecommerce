import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  aboutYou: string;

  @OneToOne(() => User, (user) => user.profile)
  user: User;

  country: 'Poland' | 'England';

  town: string;
}
