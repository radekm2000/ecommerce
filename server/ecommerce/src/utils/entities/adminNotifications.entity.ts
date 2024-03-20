import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class AdminNotifications {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  action: string;

  @UpdateDateColumn()
  createdAt: Date;
}
