import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
} from 'typeorm';

import { Relationship } from '../relationships/relationship.entity';

@Entity({ name: 'relationship_property_keys' })
@ObjectType()
export class RelationshipPropertyKey {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  @Field(() => Int)
  relationship_property_key_id: number;

  @Column({ nullable: false })
  @Field(() => String)
  @ManyToOne(() => Relationship)
  @JoinColumn({
    name: 'relationship_id',
    foreignKeyConstraintName: 'relationship_property_keys_relationship_id_fkey',
  })
  relationship_id: number;

  @Column({ length: 64, nullable: true })
  @Field(() => String)
  property_key: string;
}
