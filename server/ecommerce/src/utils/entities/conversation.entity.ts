import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Message } from './message.entity';

@Entity()
export class Conversation {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, { createForeignKeyConstraints: false })
  @JoinColumn()
  creator: User;

  @OneToOne(() => User, { createForeignKeyConstraints: false })
  @JoinColumn()
  recipient: User;

  @OneToMany(() => Message, (message) => message.conversation, {
    cascade: true,
    createForeignKeyConstraints: false,
  })
  messages: Message[];

  @OneToOne(() => Message, { nullable: true })
  @JoinColumn()
  lastMessageSent: Message;

  @JoinColumn()
  lastMessageSentAt: Date;
}
