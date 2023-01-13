import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
} from 'typeorm';

import { RelationshipPropertyKey } from '../relationship_property_keys/relationship_property_key.entity';
import { PropertyValue } from '../node_property_values/node_property_value.entity';

@Entity({ name: 'relationship_property_values' })
@ObjectType()
export class RelationshipPropertyValue {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  @Field(() => Int)
  relationship_property_value_id: number;

  @Column({ nullable: false })
  @Field(() => String)
  @ManyToOne(() => RelationshipPropertyKey)
  @JoinColumn({
    name: 'relationship_property_key_id',
    foreignKeyConstraintName:
      'relationship_property_values_relationship_property_key_id_fkey',
  })
  relationship_property_key_id: number;

  @Column('jsonb', { nullable: true })
  @Field(() => PropertyValue)
  property_value: string;
}
