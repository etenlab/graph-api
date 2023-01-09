import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { RelationshipsService } from './relationships.service';
import { Relationship } from './relationship.entity';

@Resolver(() => Relationship)
export class RelationshipsResolver {
  constructor(private readonly relationshipsService: RelationshipsService) {}

  @Query(() => [Relationship], { name: 'relationships' })
  findAll() {
    return this.relationshipsService.findAll();
  }

  @Query(() => Relationship, { name: 'relationship' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.relationshipsService.findOne(id);
  }
}
