import { ObjectType, Field } from '@nestjs/graphql';
import { Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'relationship_types' })
@ObjectType()
export class RelationshipType {
  @PrimaryColumn({ length: 32 })
  @Field(() => String)
  type_name: string;
}
