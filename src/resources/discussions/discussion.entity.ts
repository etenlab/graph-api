import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'discussions', schema: 'admin' })
@ObjectType()
export class Discussion {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  @Field(() => Int)
  id: number;

  @Column({ length: 64, nullable: false })
  @Field(() => String)
  table_name: string;

  @Column({ type: 'bigint', nullable: false })
  @Field(() => Int)
  row: number;
}
