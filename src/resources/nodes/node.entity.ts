import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

import { NodeType } from '../node_types/node_type.entity';

@Entity({ name: 'nodes' })
@ObjectType()
export class Node {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  @Field(() => Int)
  node_id: number;

  @Field(() => String)
  @ManyToOne(() => NodeType)
  @JoinColumn({
    name: 'node_type',
    foreignKeyConstraintName: 'nodes_node_type_fkey',
  })
  node_type: string;
}
