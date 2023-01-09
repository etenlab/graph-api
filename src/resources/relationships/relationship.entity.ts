import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
} from 'typeorm';

import { RelationshipType } from '../relationship_types/relationship_type.entity';
import { Node } from '../nodes/node.entity';

@Entity({ name: 'relationships' })
@ObjectType()
export class Relationship {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  @Field(() => Int)
  relationship_id: number;

  @Field(() => String)
  @ManyToOne(() => RelationshipType)
  @JoinColumn({
    name: 'relationship_type',
    foreignKeyConstraintName: 'relationships_relationship_type_fkey',
  })
  relationship_type: string;

  @Column({ nullable: true })
  @Field(() => String)
  @ManyToOne(() => Node)
  @JoinColumn({
    name: 'from_node_id',
    foreignKeyConstraintName: 'relationships_from_node_id_fkey',
  })
  from_node_id: number;

  @Column({ nullable: true })
  @Field(() => String)
  @ManyToOne(() => Node)
  @JoinColumn({
    name: 'to_node_id',
    foreignKeyConstraintName: 'relationships_to_node_id_fkey',
  })
  to_node_id: number;
}
