import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
} from 'typeorm';

import { NodePropertyKey } from '../node_property_keys/node_property_key.entity';

@ObjectType()
export class PropertyValue {
  @Field(() => String)
  value: string | number;
}

@Entity({ name: 'node_property_values' })
@ObjectType()
export class NodePropertyValue {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  @Field(() => Int)
  node_property_value_id: number;

  @Column({ nullable: false })
  @Field(() => Int)
  @ManyToOne(() => NodePropertyKey)
  @JoinColumn({
    name: 'node_property_key_id',
    foreignKeyConstraintName: 'node_property_values_node_property_key_id_fkey',
  })
  node_property_key_id: number;

  @Column('jsonb', { nullable: true })
  @Field(() => PropertyValue)
  property_value: string;
}
