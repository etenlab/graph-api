import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
} from 'typeorm';

import { Node } from '../nodes/node.entity';

@Entity({ name: 'node_property_keys' })
@ObjectType()
export class NodePropertyKey {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  @Field(() => Int)
  node_property_key_id: number;

  @Column({ nullable: false })
  @Field(() => String)
  @ManyToOne(() => Node)
  @JoinColumn({
    name: 'node_id',
    foreignKeyConstraintName: 'node_property_keys_node_id_fkey',
  })
  node_id: number;

  @Column({ length: 64, nullable: true })
  @Field(() => String)
  property_key: string;
}
