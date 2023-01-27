import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
} from 'typeorm';

import { Votable } from '../votables/votable.entity';

@Entity({ name: 'ballot_entries', schema: 'admin' })
@ObjectType()
export class BallotEntry {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  @Field(() => Int)
  id: number;

  @Field(() => String)
  @ManyToOne(() => Votable)
  @JoinColumn({
    name: 'table_name',
    foreignKeyConstraintName: 'ballot_entries_table_name_fkey',
  })
  table_name: string;

  @Column({ type: 'bigint', nullable: false })
  @Field(() => Int)
  row: number;
}
