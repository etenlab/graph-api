import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
} from 'typeorm';

import { BallotEntry } from '../ballot_entries/ballot_entry.entity';

@Entity({ name: 'votes', schema: 'admin' })
@ObjectType()
export class Vote {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  @Field(() => Int)
  id: number;

  @Column({ nullable: false })
  @Field(() => String)
  @ManyToOne(() => BallotEntry)
  @JoinColumn({
    name: 'ballot_entry_id',
    foreignKeyConstraintName: 'votes_ballot_entry_id_fkey',
  })
  ballot_entry_id: number;

  @Column('bool')
  @Field(() => Boolean)
  up: boolean;
}
