import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
} from 'typeorm';

import { Discussion } from '../discussions/discussion.entity';

@Entity({ name: 'posts', schema: 'admin' })
@ObjectType()
export class Post {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  @Field(() => Int)
  id: number;

  @Column({ nullable: false })
  @Field(() => Int)
  @ManyToOne(() => Discussion)
  @JoinColumn({
    name: 'discussion_id',
    foreignKeyConstraintName: 'posts_discussion_id_fkey',
  })
  discussion_id: number;

  @Column()
  @Field(() => String)
  plain_text: string;
}
