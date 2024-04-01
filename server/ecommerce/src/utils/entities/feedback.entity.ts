import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Feedback {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  featureType: 'other' | 'enhancement' | 'bug' | 'new feature';

  @Column()
  email: string;

  @Column()
  contactName: string;

  @Column()
  description: string;

  @UpdateDateColumn()
  createdAt: Date;
}
