import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
@Entity()
export class Avatar {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  avatarUrl: string | null;

  @Column()
  avatarName: string;

  @JoinColumn()
  @OneToOne(() => User, (user) => user.avatar, {
    createForeignKeyConstraints: false,
  })
  user: User;
}
