import {
  Resolver,
  Query,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';

import { RelationshipsService } from './relationships.service';
import { Relationship } from './relationship.entity';
import { RelationshipPropertyKey } from '../relationship_property_keys/relationship_property_key.entity';
import { RelationshipPropertyKeysService } from '../relationship_property_keys/relationship_property_keys.service';

@Resolver(() => Relationship)
export class RelationshipsResolver {
  constructor(
    private readonly relationshipsService: RelationshipsService,
    private readonly relationshipPropertyKeysService: RelationshipPropertyKeysService,
  ) {}

  @Query(() => [Relationship], { name: 'relationships' })
  findAll() {
    return this.relationshipsService.findAll();
  }

  @Query(() => Relationship, { name: 'relationship' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.relationshipsService.findOne(id);
  }

  @ResolveField('propertyKeys', () => [RelationshipPropertyKey])
  findPropertyKeys(@Parent() { relationship_id }: Relationship) {
    return this.relationshipPropertyKeysService.findAll({
      where: { relationship_id },
    });
  }
}
