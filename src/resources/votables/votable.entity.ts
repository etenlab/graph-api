import { ObjectType, Field } from '@nestjs/graphql';
import { Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'votables' })
@ObjectType()
export class Votable {
  @PrimaryColumn({ length: 32 })
  @Field(() => String)
  table_name: string;
}
