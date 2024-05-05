import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Conversation } from './conversation.entity';
import { User } from './user.entity';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @ManyToOne(() => Conversation, (conversation) => conversation.messages, {
    createForeignKeyConstraints: false,
    cascade: true,
  })
  conversation: Conversation;

  @Column({ nullable: true })
  edited?: boolean;

  @ManyToOne(() => User, (user) => user.messages)
  author: User;

  @Column({ nullable: true })
  imageName?: string;

  @Column({ nullable: true })
  imageUrl?: string;
}
