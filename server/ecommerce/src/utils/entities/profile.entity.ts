import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';
const countries = ['Poland', 'England'] as const;
type Country = (typeof countries)[number];
@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  aboutYou: string;

  @OneToOne(() => User, (user) => user.profile)
  user: User;

  @Column({ default: 'Poland' })
  country: Country;
}
