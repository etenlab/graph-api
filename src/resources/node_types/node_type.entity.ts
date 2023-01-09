import { ObjectType, Field } from '@nestjs/graphql';
import { Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'node_types' })
@ObjectType()
export class NodeType {
  @PrimaryColumn({ length: 32 })
  @Field(() => String)
  type_name: string;
}
